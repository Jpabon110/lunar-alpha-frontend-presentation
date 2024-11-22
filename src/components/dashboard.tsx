import React, { useEffect, useState } from 'react';
import { Tabs, Tab, TabList, TabPanel, Box } from '@mui/joy';
import MetricBar from './metrics';
import '../index.css';
import TaskTable from './taskTable';
import MemberCrewTable from './memberCrewTable';
import { getResources } from '../redux/actions/resource.actions';
import { AppDispatch } from "../redux/store";
import { resourcesAvalibles } from '../redux/resources.selectors';
import { useSelector, useDispatch } from "react-redux";
import { Alerts } from './alerts';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const Dashboard: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState<number>(1);
    const dispatch: AppDispatch = useDispatch();
    const resourcesAvaliblesInfo = useSelector(resourcesAvalibles);

    const handleTabChange = (
        event: React.SyntheticEvent<Element, Event> | null,
        value: string | number | null
    ) => {
        if (value !== null && typeof value === 'number') {
            setSelectedTab(value);
        }
    };

    useEffect(() => {
        dispatch(getResources());
        const idInterval = setInterval(() => {
            dispatch(getResources());
        }, 10000);
        return () => {
            clearInterval(idInterval);
        }
    }, []);

    return (
        <div className="flex justify-center">
            <div>
                <div className="flex  mb-5">
                    <h5 className="title-resource">Resource Metrics</h5>
                </div>
                <div className="flex flex-wrap justify-between mb-10">
                    <MetricBar resourcesAvaliblesInfo={resourcesAvaliblesInfo} label="Oxygen" value={75} />
                    <MetricBar resourcesAvaliblesInfo={resourcesAvaliblesInfo} label="Food" value={50} />
                    <MetricBar resourcesAvaliblesInfo={resourcesAvaliblesInfo} label="Energy" value={90} />
                </div>
                <Box className="scale-wight">
                    <Tabs
                        value={selectedTab}
                        onChange={handleTabChange}
                        defaultValue={1}
                    >
                        <TabList className="custom-tabs tabs-container please">
                            <Tab value={1} className={`tab ${selectedTab === 1 ? 'selected' : 'isNotSelected'}`}>Taks</Tab>
                            <Tab value={2} className={`tab ${selectedTab === 2 ? 'selected' : 'isNotSelected'}`}>Members Crews</Tab>
                            <Tab value={3} className={`tab ${selectedTab === 3 ? 'selected' : 'isNotSelected'}`}>
                                Alerts
                                <Box
                                    className="absolute top-[-8px] right-[-12px] bg-yellow-500 text-white rounded-full flex items-center justify-center w-6 h-6 text-sm font-bold shadow-lg"
                                >
                                    <WarningAmberIcon fontSize="inherit" />
                                </Box>
                            </Tab>
                        </TabList>
                        <TabPanel value={1}>
                            <Box className="mt-4"> <TaskTable /> </Box>
                        </TabPanel>
                        <TabPanel value={2}>
                            <Box className="mt-4 complete-wight"> <MemberCrewTable /> </Box>
                        </TabPanel>
                        <TabPanel value={3}>
                            <Box className="mt-4"><Alerts /></Box>
                        </TabPanel>
                    </Tabs>
                </Box>
            </div>
        </div>
    );
};

export default Dashboard;
