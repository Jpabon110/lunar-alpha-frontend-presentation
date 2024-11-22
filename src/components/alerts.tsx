import React, { useEffect } from "react";
import { Alert } from "@mui/material";
import TablePagination from '@mui/material/TablePagination';
import { useSelector, useDispatch } from "react-redux";
import { getAlerts } from '../redux/actions/alerts.actions';
import { alertsAvalibles } from "../redux/alerts.selectors";
import { AppDispatch } from "../redux/store";

export const Alerts: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    alerts,
    loading,
    page,
    total,
    limit,
  } = useSelector(alertsAvalibles);

  useEffect(() => {
    dispatch(getAlerts({ page: 1, limit: 10 }));
    const idInterval = setInterval(() => {
      dispatch(getAlerts({ page, limit }));
    }, 10000);
    return () => {
        clearInterval(idInterval);
    }
  }, []);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    dispatch(getAlerts({ page: newPage, limit }));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(getAlerts({ page: 1, limit: parseInt(event.target.value, 10) }));
  };

  return (<>
    {
      alerts.map((alert) => {
        if (alert.critical) {
          return <Alert severity="error">{`${alert.createdAt.toLocaleString()} ${alert.description}`}</Alert>
        }
        if (alert.levelResource < 65) {
          return <Alert severity="warning">{`${alert.createdAt.toLocaleString()} ${alert.description}`}</Alert>
        }
        return <Alert severity="success">{`${alert.createdAt.toLocaleString()} ${alert.description}`}</Alert>
      })
    }
    <TablePagination
      component="div"
      count={total}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={limit}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  </>);
};