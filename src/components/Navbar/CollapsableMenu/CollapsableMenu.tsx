import FlexContainer from "@/components/FlexContainer/FlexContainer";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import React from "react";

import FolderIcon from "@mui/icons-material/Folder";

import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { useRouter } from "next/router";

type Props = {};

const actions = [
  { icon: <FolderIcon />, name: "Folder" },
  { icon: <LibraryBooksIcon />, name: "Deck" },
  { icon: <LocalLibraryIcon />, name: "Flashcard" },
];

const CollapsableMenu = ({ icon }: { icon: JSX.Element }) => {
  const router = useRouter();
  return (
    <SpeedDial
      data-cy="collapsable-menu-button"
      ariaLabel="Create Menu"
      icon={icon}
      direction="down"
    >
      {actions.map((action) => (
        <SpeedDialAction
          data-cy={`${action.name.toLowerCase()}-button`}
          onClick={() => router.push("/create/" + action.name.toLowerCase())}
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
        />
      ))}
    </SpeedDial>
  );
};

export default CollapsableMenu;
