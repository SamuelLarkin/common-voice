import * as React from 'react';
import API from '../../services/api';
import { Sentence, SentenceCard } from './SentenceCard';

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



interface Report {
   client_id: string;
   created_at: string;
   id: number;
   reason: string;
   sentence: Sentence;
}



function Card({item}: {item: Report}) {
   return (
      <>
         <Box margin={1}>
            <Typography variant="h6" gutterBottom component="div">
               Report
            </Typography>
            <span>client id: {item.client_id}</span>
         </Box>
         <SentenceCard sentence={item.sentence} />
      </>
   );
}



function Row({item}: { item: Report }) {
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
            <TableCell align="left">{item.reason}</TableCell>
            <TableCell align="left">{item.sentence.text}</TableCell>
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



export default function ReportedSentencesList() {
   const [items, setItems] = React.useState<Report[]>();

   React.useEffect(() => {
      async function apiCall() {
         const apiResponse = await fetch('/api/v1/report/reported_sentences')
            .then((response) => response.json());
         //console.log(apiResponse);
         setItems(apiResponse);
      }
      apiCall();
   }, []);

   return (
      <>
         <h1>Reported Sentences</h1>
         <p>Sentence reported by a speaker as having some issue.</p>
         <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
               <TableHead>
                  <TableRow>
                     <TableCell />
                     <TableCell>id</TableCell>
                     <TableCell align="left">Created at</TableCell>
                     <TableCell align="left">Reason</TableCell>
                     <TableCell align="left">Sentence</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {
                     items
                     && items.map((item: Report) => <Row key={item.id} item={item} />)
                  }
               </TableBody>
            </Table>
         </TableContainer>
      </>
   );
}
