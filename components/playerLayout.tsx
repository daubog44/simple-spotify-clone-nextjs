import { Box } from "@chakra-ui/layout";
import PlayBar from "./playBar";
import Sidebar from "./sidebar";

const PlayerLayout = ({ children }) => {
  return (
    <Box width="100vw" height="100vh">
      <Box position="absolute" top="0" left="0" width="250px">
        <Sidebar />
      </Box>
      <Box marginBottom="100px" marginLeft="250px">
        <Box height="calc(100vh - 100px)">{children}</Box>
      </Box>
      <Box position="absolute" left="0" bottom="0">
        <PlayBar />
      </Box>
    </Box>
  );
};

export default PlayerLayout;
