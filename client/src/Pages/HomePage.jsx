import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";

import TodoAdd from "../components/ToDoAdd/TodoAdd";

const Wrapper = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(6),
  "& .container": {
    paddingTop: theme.spacing(4),
  },
}));

const HomePage = () => {
  return (
    <Wrapper>
      <Typography variant="h4" align="center" textTransform="uppercase">
        personal todo
      </Typography>
      <Container maxWidth="md" className="container">
        <TodoAdd />
      </Container>
    </Wrapper>
  );
};

export default HomePage;
