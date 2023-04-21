import * as React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';



interface Sentence {
   bucket: string;
   clips_count: number;
   created_at: string;
   has_valid_clip: number;
   id: string;
   is_used: number;
   locale_id: number;
   locale_name: string;
   source: string;
   text: string;
   version: number;
}



function SentenceCard({sentence}: {sentence: Sentence}) {
   return (
      <>
         <Box margin={1}>
            <Typography variant="h6" gutterBottom component="div">
               Sentence
            </Typography>
            <ul style={{backgroundColor: "#FF6F61"}}>
               <li>bucket: {sentence.bucket}</li>
               <li>clip_count: {sentence.clips_count}</li>
               <li>created at: {sentence.created_at}</li>
               <li>has valid clip: {sentence.has_valid_clip}</li>
               <li>id: {sentence.id}</li>
               <li>is_used: {sentence.is_used}</li>
               <li>locale_name: {sentence.locale_name}</li>
               <li>source: {sentence.source}</li>
               <li>text: {sentence.text}</li>
               <li>version: {sentence.version}</li>
            </ul>
         </Box>
         </>
   );
}



export { Sentence, SentenceCard };
