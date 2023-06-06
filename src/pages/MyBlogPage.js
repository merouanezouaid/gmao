import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import Axios from 'axios';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';

import NewIntervention from './Interventions/NewIntervention';

import NewAssign from './Interventions/NewAssign';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'Lieu', label: 'Lieu', alignRight: false },
  { id: 'Matériel', label: 'Matériel', alignRight: false },
  { id: 'Station', label: 'Station', alignRight: false },
  { id: 'Priorité', label: 'Priorité', alignRight: false },
  { id: 'Issue', label: 'Issue', alignRight: false },
  { id: 'Description', label: 'Description', alignRight: false },
  { id: 'demandeur', label: 'Nom de demandeur', alignRight: false },
  { id: 'assignedto', label: 'Assignée à', alignRight: false },
  { id: 'etat', label: 'Etat', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.Lieu.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = interventions.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleAssign = () => {
    // const user = prompt("Assigner à :");
    // if(user == null || user === ""){
    //   console.log("Non assigné");
    // }
    // else{
    //   console.log("Assigné");
    //   alert(`Tache assigné à ${user} avec succès !`)
    // }
    setOpen3(!open3);
  }

  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  const handleIntervention = () => {
    setOpen2(!open2);
  };
  
  const [interventions, setInterventions] = useState([]);
  useEffect(() => {
    const user = localStorage.getItem("user").NomComplet;
    console.log(user)
    Axios.get('http://localhost:3001/intervention/get').then((response) => {
      setInterventions(response.data);
      console.log(response.data);
    });
  }, [open2]);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - interventions.length) : 0;

  const filteredUsers = applySortFilter(interventions, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;



  return (
    <>
      <Helmet>
        <title> Interventions </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Interventions
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleIntervention}>
            Nouvelle intervention
          </Button>
        </Stack>
        <NewIntervention isOpen={open2} toggle={handleIntervention} />


        <Card>
          <UserListToolbar placeholder="Rechercher.." numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={interventions.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { Lieu, Materiel, Station, Priorite, Issue, Description, NomDemandeur, assignee, etat} = row;

                    return (
                      <TableRow key={Lieu}>
                        <TableCell/>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            
                            <Typography variant="subtitle2" noWrap>
                              {Lieu}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{Materiel}</TableCell>

                        <TableCell align="left">{Station}</TableCell>
                        <TableCell align="left">{Priorite}</TableCell>  
                        <TableCell align="left">{Issue}</TableCell>
                        <TableCell align="left">{Description}</TableCell>
                        <TableCell align="left">{NomDemandeur}</TableCell>
                        <TableCell align="left">{assignee || "Non"}</TableCell>
                        <TableCell align="left">{assignee ? etat || "En cours" : "Initialisé"}</TableCell>

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                            <Iconify icon={'eva:more-vertical-fill'} onClick={()=> setSelected(row)}/>
                          </IconButton>
                        </TableCell>

                        <NewAssign isOpen={open3} toggle={handleAssign} data={selected} />

                      </TableRow>
                      
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={interventions.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >

        <MenuItem onClick={handleAssign} sx={{ color: 'success.main' }}>
          <Iconify icon={'material-symbols:assignment-add'} sx={{ mr: 2 }} />
          Assign
        </MenuItem>
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
