import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import SeaWaves from "../../images/big-waves-ocean.png";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
      }}
      backgroundColor={theme.palette.background.alt}
    >
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Snippet Sea
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundImage: `url(${SeaWaves})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          width={isNonMobileScreens ? "50%" : "93%"}
          p="2rem"
          borderRadius="1.5rem"
          backgroundColor={theme.palette.background.alt}
          sx={{
            maxHeight: "90%",
            overflowY: "auto",
          }}
        >
          {/* <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
            Welcome to Snippet Sea, the Social Media for Sociopaths!
          </Typography> */}
          <Form />
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
