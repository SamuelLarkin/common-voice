import * as React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import API from '../../services/api';



interface Clip {
   bucket: string;
   client_id: string;
   created_at: string;
   id: number;
   is_valid: number;
   locale_id: number;
   locale_name: string;
   needs_votes: number;
   original_sentence_id: string;
   path: string;
   sentence: string;
   validated_at: string;
}



function ClipCard({clip}: {clip: Clip}) {
   const [clipUrl, setClipUrl] = React.useState<string>();

   React.useEffect(() => {
      async function apiCall() {
         const apiResponse = await fetch(`/api/v1/clips/url/${clip.id}`)
            .then((response) => response.json());
         console.log(apiResponse);
         setClipUrl(apiResponse);
      }
      console.log(`ClipCard::apiCall(${clip.id})`);
      apiCall();
   }, []);

   return (
      <>
         <Box margin={1}>
            <Typography variant="h6" gutterBottom component="div">
               Clip
               <audio src={clipUrl} />
            </Typography>
            <ul style={{backgroundColor: "#FF6F61"}}>
               <li>bucket: {clip.bucket}</li>
               <li>client id: {clip.client_id}</li>
               <li>created at: {clip.created_at}</li>
               <li>id: {clip.id}</li>
               <li>is valid: {clip.is_valid}</li>
               <li>locale name: {clip.locale_name}</li>
               <li>needs votes: {clip.locale_name}</li>
               <li>original sentence id: {clip.original_sentence_id}</li>
               <li>path: {clip.path}</li>
               <li>sentence: {clip.sentence}</li>
               <li>validated at: {clip.validated_at}</li>
            </ul>
         </Box>
      </>
   );
}



export { Clip, ClipCard };
