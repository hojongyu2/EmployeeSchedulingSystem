import { Typography } from "@mui/material";
import { Box, Container } from "@mui/system";

function GreetingCard() {
  return (
    <Container>
      <Box minWidth={100} textAlign="center">
        <Typography variant="h3" sx={{}}><strong>SHIFT</strong></Typography>
        <Typography variant="h4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique delectus dolore incidunt numquam cupiditate vero dicta provident. Magnam maxime nemo odio. Nisi et voluptatum totam facere harum dicta magnam. Veniam.</Typography>
      </Box>
    </Container>
  );
}

export default GreetingCard;
