import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FaTwitter } from "react-icons/fa";
import React from "react";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "../config/axios";
import localStorageService from "../services/localStorageService";
import { AuthContext } from "../contexts/AuthContextProvider";

function LoginPage() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const { setIsAuthenticated } = useContext(AuthContext);

  const history = useHistory();

  const validateInput = () => {
    const newError = {};
    if (!emailOrUsername)
      newError.emailOrUsername = "email or username is required";
    if (!password) newError.password = "password is required";
    setError(newError);
  };

  const handleLogin = async () => {
    try {
      validateInput();
      const res = await axios.post("/login", { emailOrUsername, password });
      localStorageService.setToken(res.data.token);
      setIsAuthenticated(true);
      history.push("/");
    } catch (err) {
      if (err.response) {
        setError((prev) => ({ ...prev, server: err.response.data.message }));
        console.log(err.response);
      } else {
        setError((prev) => ({ ...prev, front: err.message }));
      }
    }
  };

  return (
    <Flex direction="column" mt="20px" alignItems="center">
      <IconButton
        variant="none"
        as={FaTwitter}
        w="40px"
        h="40px"
        color="blue.400"
        ml="-330px"
        mb="25px"
      />
      <Text fontWeight="700" fontSize="35px" mb="25px" ml="-100px">
        Log in to Twitter
      </Text>
      <Flex direction="column" mb="25px">
        <Input
          placeholder="Username or Email"
          w="380px"
          h="60px"
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
        ></Input>
        {error.emailOrUsername && (
          <Text color="red" fontSize="12px" textAlign="left">
            {error.emailOrUsername}
          </Text>
        )}
        {!error.emailOrUsername && !error.password && error.server && (
          <Text color="red" fontSize="12px" textAlign="left">
            {error.server}
          </Text>
        )}
      </Flex>

      <Flex direction="column" mb="25px">
        <InputGroup w="380px" >
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            h="60px"
          />

          <InputRightElement h="60px">
            <Button
              variant="none"
              onClick={handleClick}
              fontSize="10px"
              _focus={{ borderStyle: "none" }}
            >
              {show ? (
                <IconButton
                  variant="none"
                  icon={<ViewOffIcon />}
                  _focus={{ borderStyle: "none" }}
                />
              ) : (
                <IconButton
                  variant="none"
                  icon={<ViewIcon />}
                  _focus={{ borderStyle: "none" }}
                />
              )}
            </Button>
          </InputRightElement>
        </InputGroup>
        {error.password && (
          <Text color="red" fontSize="12px" textAlign="left">
            {error.password}
          </Text>
        )}
      </Flex>
      {/* <Input placeholder='Password' type='password' w='380px' h='60px' mb='25px'></Input> */}
      <Button
        borderRadius="40px"
        bgColor="blue.400"
        color="white"
        h="45px"
        w="380px"
        mb="35px"
        onClick={handleLogin}
      >
        Log in
      </Button>
      <Flex direction="row">
        <Link href="./" mr="10px" color="blue.400">
          Forget Password ?
        </Link>
        <Link href="./" color="blue.400">
          Sign up for Twitter
        </Link>
      </Flex>
    </Flex>
  );
}

export default LoginPage;
