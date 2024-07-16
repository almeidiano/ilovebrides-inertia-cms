import React from "react";
import MUIDataTable from "mui-datatables";
import Button from '@mui/material/Button';
import PageInfo from '@/Components/PageInfo';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function handleActionClick(rowData) {
  console.log('Ações para:', rowData);
}

function General({users}) {
  const columns = [
    {
      name: "id",
      label: "Id",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "name",
      label: "Nome",
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: "newsletter",
      label: "Newsletter",
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: 'actions',
      label: 'Ações',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div>
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                Dashboard
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </div>
          );
        }
      }
    },
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log(users)

  const data = users;

  const options = {
    rowsPerPageOptions: [10],
    textLabels: {
      body: {
        noMatch: "Nenhum ultilizador foi encontrado",
        toolTip: "Sort",
        columnHeaderTooltip: column => `Sort for ${column.label}`
      },
      pagination: {
        next: "Next Page",
        previous: "Previous Page",
        // rowsPerPage: "Rows per page:",
        displayRows: "of",
      },
      toolbar: {
        search: "Search",
        downloadCsv: "Download CSV",
        // print: "Print",
        viewColumns: "View Columns",
        filterTable: "Filter Table",
      },
      filter: {
        all: "All",
        title: "FILTERS",
        reset: "RESET",
      },
      viewColumns: {
        title: "Show Columns",
        titleAria: "Show/Hide Table Columns",
      },
      selectedRows: {
        text: "row(s) selected",
        delete: "Delete",
        deleteAria: "Delete Selected Rows",
      },
    }
  }

  return (
    <div>
      <PageInfo title="Ultilizadores Gerais (públicos e profissionais)" />
      <MUIDataTable
        title={"Lista de Ultilizadores"}
        data={data}
        columns={columns}
        options={options}
      />
    </div>
  );
}

export default General;
