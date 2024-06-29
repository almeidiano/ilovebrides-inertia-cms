import { Typography } from "@mui/material";
import Divider from '@mui/material/Divider';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';

export default function PageInfo({title, description}) {
  return (
    <div>
      {/* <Breadcrumbs separator="›" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
      <Breadcrumbs separator="-" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs> */}
      <Typography variant="h5" gutterBottom>
        <IconButton aria-label="delete" size="medium">
          <ArrowBackIcon fontSize="inherit" />
        </IconButton>
        {title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>{description}</Typography>
      <Divider />
    </div>
  )
}

