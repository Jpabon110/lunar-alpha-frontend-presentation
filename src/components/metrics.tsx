import React from 'react';
import { LinearProgress, Box, Typography } from '@mui/material';
import { Resource } from '../interfaces/interfaces';

interface MetricBarProps {
  label?: string;
  value?: number;
  resourcesAvaliblesInfo: Resource[];
}

const MetricBar: React.FC<MetricBarProps> = ({ label, value, resourcesAvaliblesInfo }) => {
  console.log("resourcesAvaliblesInfo", resourcesAvaliblesInfo);
  const getProgressColor = (critical: boolean, level: number): "primary" | "secondary" | "error" | "warning" | "info" | "success" | "inherit" => {
    if (critical && level >= 40 && level <= 60) {
      return "warning";
    }
    if (critical) {
      return "error";
    }
    return "primary";
  };
  return (
    <>
      {resourcesAvaliblesInfo.map((resource, index) =>
        (resource.type === label) && (
          <Box className="w-[30%] p-4 rounded-lg bg-gray-100 shadow-md" key={index}>
            <Typography variant="h6" className="text-gray-700 font-bold mb-2">
              {resource.type}
            </Typography>
            <Box className="flex items-center">
              <LinearProgress
                variant="determinate"
                value={resource.level}
                className="w-full rounded-lg h-3 m-[5%]"
                color={getProgressColor(resource.critical, resource.level)} 
              />
              <Typography
                variant="body2"
                className="ml-4 text-gray-800 font-semibold"
              >
                {resource.level}%
              </Typography>
            </Box>
          </Box>
        )
      )}
    </>
  );
};

export default MetricBar;
