import { Typography } from "@mui/material";
import { Box, Container } from "@mui/system";

function GreetingCard() {
  return (
    <Container>
      <Box minWidth={100} textAlign="center">
        <Typography variant="h3" sx={{ color: "#d84315" }}><strong>MediVolunteer</strong></Typography>
        <Typography variant="h4">Unite healthcare volunteers with effortless form creation and valuable insights."</Typography>
      </Box>
    </Container>
  );
}

export default GreetingCard;
