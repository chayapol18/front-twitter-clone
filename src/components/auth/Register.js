import {
  Box,
  Button,
  Flex,
  Stack,
  Input,
  IconButton,
  Text,
  Lorem,
  Select,
  FormControl,
  FormLabel,
  FormHelperText,
  InputGroup,
  InputRightElement,
  HStack,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import { FaTwitter } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContextProvider";
import axios from "../../config/axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import localStorageService from "../../services/localStorageService";

const DatePickerButton = ({ onSelect, selected }) => {
  // const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      selected={selected}
      // onSelect={date => setStartDate(date)}
      onSelect={onSelect}
      placeholderText="select your birth "
    />
  );
};

const SignupModal = ({
  input,
  setInput,
  handleInputChange,
  handleSubmit,
  birthDate,
  setBirthDate,
  error,
  setError
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure({
    onClose: () => {
      setInput({
        name: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      });
      setBirthDate("");
      setError('')
    },
  });

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <>
      <Button
        onClick={onOpen}
        borderRadius="40px"
        bgColor="blue.400"
        color="white"
        h="45px"
      >
        Sign up
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <IconButton
              variant="none"
              as={FaTwitter}
              w="30px"
              h="30px"
              ml="230px"
              color="blue.400"
              mb="15px"
            />
            <Text fontWeight="700">Create your account</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={3}>
              <FormControl id="name">
                <Flex direction="row">
                  <FormLabel>Name</FormLabel>
                  {error.name && <Text color="red">{error.name}</Text>}
                </Flex>
                <Input
                  placeholder="Name"
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl id="email" isRequired>
                <Flex direction="row">
                  <FormLabel>Email</FormLabel>
                  {error.email && <Text color="red">{error.email}</Text>}
                </Flex>
                <Input
                  placeholder="Email"
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl id="username" isRequired>
                <Flex direction="row">
                  <FormLabel>Username</FormLabel>
                  {error.username && <Text color="red">{error.username}</Text>}
                </Flex>
                <Input
                  placeholder="Username"
                  type="text"
                  name="username"
                  value={input.username}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl id="birthDate" isRequired>
                <FormLabel>Date of Birth</FormLabel>
                <DatePickerButton
                  selected={birthDate}
                  onSelect={(e) => setBirthDate(e)}
                />
              </FormControl>

              {/* <Flex direction='column'>
                          <Text mr='15px' mb='10px'>Date of Birth :</Text>
                          <DatePickerButton 
                            selected={input.birthDate}
                            onSelect={handleInputChange} 
                          />
                      </Flex> */}

              {/* <FormControl id='birthDate' isRequired>
                        <FormLabel>Date of Birth</FormLabel>
                        <Input placeholder='Date of Birth' type="text" name="birthDate" value={input.birthDate} onChange={handleInputChange}/>
                      </FormControl> */}

              <FormControl id="password" isRequired>
                <Flex direction="row">
                  <FormLabel>Password</FormLabel>
                  {error.password && <Text color="red">{error.password}</Text>}
                </Flex>
                {/* <Input placeholder='Password' type="password" value={input.username} onChange={handleInputChange}/> */}
                <InputGroup>
                  <Input
                    type={show ? "text" : "password"}
                    placeholder="Enter password"
                    value={input.password}
                    onChange={handleInputChange}
                    name="password"
                  />
                  <InputRightElement>
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
              </FormControl>

              <FormControl id="confirmPassword" isRequired>
                <Flex direction="row">
                  <FormLabel>Confirm Password</FormLabel>
                  {error.confirmPassword && (
                    <Text color="red">{error.confirmPassword}</Text>
                  )}
                </Flex>

                {/* <Input placeholder='Confirm Password' type="password" value={input.confirmPassword} onChange={handleInputChange}/> */}
                <InputGroup>
                  <Input
                    type={show ? "text" : "password"}
                    placeholder="Enter password"
                    value={input.confirmPassword}
                    onChange={handleInputChange}
                    name="confirmPassword"
                  />
                  <InputRightElement>
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
              </FormControl>

              {error.server && <Text color="red">{error.server}</Text>}

              {/* <FormControl id='name' isRequired>
                        <FormLabel >Name</FormLabel>
                        <Input placeholder='Name' type="text" />
                        <FormHelperText>fill your name</FormHelperText>
                      </FormControl>
                      
                      <FormControl id='email' isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input placeholder='Phone, Username or Email' type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <FormHelperText>We'll never share your email.</FormHelperText>
                      </FormControl>
                      
                      <Input placeholder='Name'></Input>
                      <Input placeholder='Phone, Username or Email' name="email" type="text"></Input>
                       */}
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Sign up
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

function Register() {
  const history = useHistory();

  const [input, setInput] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [birthDate, setBirthDate] = useState("");
  const [error, setError] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));

    if (name === "name") {
      if (!value) {
        setError((prev) => ({ ...prev, name: "name is required" }));
      }
    }

    if (name === "email") {
      if (!value) {
        setError((prev) => ({ ...prev, email: "email is required" }));
      } else if (
        !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          value
        )
      ) {
        setError((prev) => ({ ...prev, email: "invalid email" }));
      } else {
        setError((prev) => ({ ...prev, email: false }));
      }
    }

    if (name === "username") {
      if (!value) {
        setError((prev) => ({ ...prev, username: "username is required" }));
      }
    }

    if (name === "password") {
      if (!value) {
        setError((prev) => ({ ...prev, password: "password is required" }));
      }
    }

    if (name === "confirmPassword") {
      if (!value) {
        setError((prev) => ({
          ...prev,
          confirmPassword: "confirmPassword is required",
        }));
      }
    }
  };

  console.log(error);
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleLogin = () => {
    history.push("/login");
  };

  const handleSignup = () => {
    history.push("/register");
  };

  const handleSubmit = () => {
    axios
      .post("/register", {
        name: input.name,
        email: input.email,
        username: input.username,
        birthDate: birthDate,
        password: input.password,
        confirmPassword: input.confirmPassword,
      })
      .then((res) => {
        localStorageService.setToken(res.data.token);
        setIsAuthenticated(true);
        history.push("/");
      })
      .catch((err) => {
        if (err.response) {
          setError({ server: err.response.data.message });
          console.log(err.response)
        } else {
          setError({ front: err.message });
        }
      });
  };

  return (
    <Flex direction="column">
      <IconButton
        variant="none"
        as={FaTwitter}
        w="45px"
        h="45px"
        color="blue.400"
        mt="15px"
        ml="0"
      />
      <Box textAlign="left" fontSize="60px" fontWeight="800" mt="40px">
        Happening Now.
      </Box>
      <Box textAlign="left" fontSize="35px" fontWeight="800" mt="50px">
        Join Twitter today.
      </Box>

      <Flex direction="column" w="60%" mt="30px">
        <Stack spacing={5}>
          <SignupModal
            input={input}
            setInput={setInput}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            birthDate={birthDate}
            setBirthDate={setBirthDate}
            error={error}
            setError={setError}
          />
          {/* <Button borderRadius='40px' bgColor='white' color='blue.400' border='solid 1px' h='45px' onClick={handleSignup}>Sign up</Button> */}
          <Button
            borderRadius="40px"
            bgColor="white"
            color="blue.400"
            border="solid 1px"
            h="45px"
            onClick={handleLogin}
          >
            Log in
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
}

export default Register;
