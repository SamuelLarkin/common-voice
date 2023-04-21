import * as React from 'react';
import API from '../../services/api';
import { Clip, ClipCard } from './ClipCard';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';



const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});



interface Vote {
   client_id: string;
   clip_id: number;
   created_at: string;
   id: number;
   is_valid: number;
}



interface ClipWithVotes extends Clip {
   votes: Vote[];
}



function VotesCard({votes}: {votes: Vote[]}) {
   return (
      <>
         <Box margin={1}>
            <Typography variant="h6" gutterBottom component="div">
               Votes
            </Typography>
            <Table size="small" aria-label="votes">
               <TableHead>
                  <TableRow>
                     <TableCell>Id</TableCell>
                     <TableCell>Create at</TableCell>
                     <TableCell align="right">Client Id</TableCell>
                     <TableCell align="right">Clip Id</TableCell>
                     <TableCell align="right">Is Valid</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {votes && votes.map((vote) => (
                     <TableRow key={vote.id}>
                        <TableCell component="th" scope="row">
                           {vote.id}
                        </TableCell>
                        <TableCell>{vote.created_at}</TableCell>
                        <TableCell align="right">{vote.client_id}</TableCell>
                        <TableCell align="right">{vote.clip_id}</TableCell>
                        <TableCell align="right">{vote.is_valid}</TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </Box>
      </>
   );
}



function Card({item}: {item: ClipWithVotes}) {
   return (
      <>
         <ClipCard clip={item} />
         <VotesCard votes={item.votes} />
      </>
   );
}



function Row({item}: { item: ClipWithVotes }) {
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

   return (
      <React.Fragment>
         <TableRow className={classes.root}>
            <TableCell>
               <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
               </IconButton>
            </TableCell>
            <TableCell component="th" scope="row">
               {item.id}
            </TableCell>
            <TableCell align="left">{item.created_at}</TableCell>
            <TableCell align="left">{item.votes === null ? 0 : item.votes.length}</TableCell>
            <TableCell align="left">{item.sentence}</TableCell>
         </TableRow>
         <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
               <Collapse in={open} timeout="auto" unmountOnExit>
                  <Card item={item} />
               </Collapse>
            </TableCell>
         </TableRow>
      </React.Fragment>
   );
}



export default function ClipsList() {
   const [items, setItems] = React.useState<ClipWithVotes[]>();

   React.useEffect(() => {
      async function apiCall() {
         const apiResponse = await fetch('/api/v1/report/clips')
            .then((response) => response.json());
         //console.log(apiResponse);
         setItems(apiResponse);
      }
      apiCall();
   }, []);

   return (
      <>
         <h1>Clips</h1>
         <p>Description</p>
         <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
               <TableHead>
                  <TableRow>
                     <TableCell />
                     <TableCell>id</TableCell>
                     <TableCell align="left">Created at</TableCell>
                     <TableCell align="left">#&nbsp;Votes</TableCell>
                     <TableCell align="left">Sentence</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {
                     items
                     && items.map((item: ClipWithVotes) => <Row key={item.id} item={item} />)
                  }
               </TableBody>
            </Table>
         </TableContainer>
      </>
   );
}
