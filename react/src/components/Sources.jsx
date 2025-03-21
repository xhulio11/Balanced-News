import React from 'react';
import { Stack, Chip } from "@mui/material";

export default function SourcesChips({ sources }) {
  // Define a static list of colors to cycle through
  const chipColors = ["primary", "secondary", "success", "error", "warning", "info"];

  return (
    <Stack direction="row" spacing={2} justifyContent={"flex-end"}>
      {sources.map((source, index) => (
        <Chip
          key={index}
          icon={source.icon}
          label={source.label}
          component="a"
          href={source.url}
          target="_blank"
          rel="noreferrer"
          clickable
          variant="outlined"
          // Pick a color based on the index
          color={chipColors[index % chipColors.length]}
        />
      ))}
    </Stack>
  );
}