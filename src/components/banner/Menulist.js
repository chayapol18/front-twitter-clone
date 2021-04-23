import {
  Box,
  Stack,
  Text,
  Flex,
  Spacer,
  Button,
  HStack,
  Icon,
  IconButton,
  Input,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  FormLabel,
  Avatar,
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
import { useDisclosure } from "@chakra-ui/react";
import { MdCall } from "react-icons/md";
import { FiUser, FiMoreHorizontal } from "react-icons/fi";
import { FaTwitter } from "react-icons/fa";
import { BiBookmark, BiHomeCircle } from "react-icons/bi";
import {
  Search2Icon,
  DragHandleIcon,
  TriangleUpIcon,
  StarIcon,
  InfoIcon,
  AttachmentIcon,
  ChevronUpIcon,
} from "@chakra-ui/icons";
import { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContextProvider";
import localStorageService from "../../services/localStorageService";
import axios from "../../config/axios";

const ModalAddTweet = ({ user, content, setContent, handleAddTweet }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme="twitter"
        variant="solid"
        ml={3}
        mt={10}
        w="220px"
        h="50px"
        borderRadius="50px"
        color="white"
      >
        Tweet
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader paddingBottom="0">
            <Box
              w="109%"
              h="30px"
              borderBottom="1px"
              borderColor="gray.200"
              ml="-24px"
            ></Box>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="row">
              {user.profileImg ? (
                <Avatar
                  src={user.profileImg}
                  alt="imgUser"
                  h="50px"
                  w="50px"
                  mr="5px"
                />
              ) : (
                <Avatar />
              )}

              <Input
                placeholder="What's happening ?"
                h="100px"
                borderStyle="none"
                _focus={{ borderStyle: "none" }}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Flex
              direction="row"
              w="100%"
              ml="60px"
              paddingTop="10px"
              borderTop="1px"
              borderColor="gray.200"
            >
              <HStack spacing="10px" justify="space-between" w="100%">
                <IconButton
                  _hover={{ background: "blue.100" }}
                  variant="ghost"
                  as={AttachmentIcon}
                  w="20px"
                  h="20px"
                  color="blue.400"
                  borderRadius="full"
                />
                {content ? (
                  <Button
                    onClick={() => {
                      handleAddTweet();
                      onClose();
                    }}
                    borderRadius="full"
                    bgColor="blue.400"
                    color="white"
                    _hover={{ background: "blue.500" }}
                  >
                    Tweet
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      handleAddTweet();
                      onClose();
                    }}
                    borderRadius="full"
                    bgColor="blue.400"
                    color="white"
                    _hover={{ background: "blue.500" }}
                    isDisabled
                  >
                    Tweet
                  </Button>
                )}

                {/* <Button onClick={() => {
                            handleAddTweet();
                            onClose();
                        }}
                        _hover={{ background: "blue.500", }} 
                        borderRadius='full' bgColor='blue.400' 
                        color='white'>Tweet</Button> */}
              </HStack>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const ModalSetting = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Text onClick={onOpen} w="100%">
        Setting
      </Text>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader paddingBottom="0">
            <Box
              w="100%"
              h="30px"
              borderBottom="1px"
              borderColor="gray.200"
              // ml="px"
            >
              Setting
            </Box>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="row">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum
              explicabo alias ducimus magnam molestias voluptates eaque illum
              animi deserunt repellat?
            </Flex>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const ModalFollowerRequests = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Text onClick={onOpen} w="100%">
        Follower Requests
      </Text>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader paddingBottom="0">
            <Box
              w="109%"
              h="30px"
              borderBottom="1px"
              borderColor="gray.200"
              ml="-24px"
            >
              {" "}
            </Box>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="row">
              <FormLabel>Request</FormLabel>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Flex
              direction="row"
              w="100%"
              ml="60px"
              paddingTop="10px"
              borderTop="1px"
              borderColor="gray.200"
            >
              <HStack spacing="10px" justify="space-between" w="100%">
                <IconButton
                  _hover={{ background: "blue.100" }}
                  variant="ghost"
                  as={AttachmentIcon}
                  w="20px"
                  h="20px"
                  color="blue.400"
                  borderRadius="full"
                />
                <Button
                  _hover={{ background: "blue.500" }}
                  borderRadius="full"
                  bgColor="blue.400"
                  color="white"
                >
                  Tweet
                </Button>
              </HStack>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

function Menulist({ pathName, getTweet, getMyTweet }) {
  console.log(pathName);
  const history = useHistory();
  const { setIsAuthenticated } = useContext(AuthContext);
  const { user, setUser } = useContext(AuthContext);
  const [error, setError] = useState("");

  const [content, setContent] = useState("");
  const [tweet, setTweet] = useState([]);

  useEffect(() => {
    const getMe = async () => {
      try {
        const res = await axios.get("/users/personal");
        setUser(res.data.user);
      } catch (err) {
        setError(err.response.data.message);
      }
    };
    getMe();
  }, []);

  const handleAddTweet = async () => {
    await axios.post("/tweets", { content, levelTweetId: 1 });
    setContent("");
    if (pathName === "Home") getTweet();
    if (pathName === "Profile") getMyTweet();
  };

  const handleLogout = (e) => {
    localStorageService.clearToken();
    setIsAuthenticated(false);
    history.push("/");
  };

  const handleHome = () => {
    history.push("/");
  };

  const handleSearch = () => {
    history.push("/search");
  };

  const handleBookmarks = () => {
    history.push("/bookmarks");
  };

  const handleProfile = () => {
    history.push("/profile");
  };

  return (
    <Box position="fixed" w="280px" ml="115px">
      <Flex
        direction="column"
        pb="16px"
        borderRight="1px"
        borderColor="gray.200"
      >
        <IconButton
          variant="ghost"
          as={FaTwitter}
          m="13px 22px 30px"
          w="30px"
          h="30px"
          color="blue.400"
        />

        <Flex direction="column" alignContent="left">
          <Stack spacing={6} ml="18px">
            <Button
              colorScheme="blue"
              variant="none"
              w="160px"
              borderRadius="50px"
              color="black"
              onClick={handleHome}
              pl="0"
              _hover={{ background: "none", border: "none" }}
              _focus={{ background: "none", border: "none" }}
            >
              <IconButton
                variant="none"
                as={BiHomeCircle}
                mr="5px"
                w="30px"
                h="30px"
                color="black"
              />
              <Box
                w="100%"
                p={1}
                color="black"
                textAlign="left"
                _hover={{ color: "blue.400" }}
              >
                Home
              </Box>
            </Button>
            <Button
              colorScheme="blue"
              variant="none"
              w="160px"
              borderRadius="50px"
              color="black"
              onClick={handleSearch}
              pl="0"
              _hover={{ background: "none", border: "none" }}
              _focus={{ background: "none", border: "none" }}
            >
              <IconButton
                variant="none"
                as={Search2Icon}
                mr="5px"
                w="20px"
                h="20px"
                color="black"
                _hover={{ background: "none", border: "none" }}
                _focus={{ background: "none", border: "none" }}
              />
              <Box
                w="100%"
                p={1}
                color="black"
                textAlign="left"
                _hover={{ color: "blue.400" }}
              >
                Explore
              </Box>
            </Button>
            <Button
              colorScheme="blue"
              variant="none"
              w="160px"
              borderRadius="50px"
              color="black"
              onClick={handleBookmarks}
              pl="0"
              _hover={{ background: "none", border: "none" }}
              _focus={{ background: "none", border: "none" }}
            >
              <IconButton
                variant="none"
                as={BiBookmark}
                mr="5px"
                w="30px"
                h="30px"
                color="black"
              />
              <Box
                w="100%"
                p={1}
                color="black"
                textAlign="left"
                _hover={{ color: "blue.400" }}
              >
                Bookmarks
              </Box>
            </Button>
            <Button
              colorScheme="blue"
              variant="none"
              w="160px"
              borderRadius="50px"
              color="black"
              onClick={handleProfile}
              pl="0"
              _hover={{ background: "none", border: "none" }}
              _focus={{ background: "none", border: "none" }}
            >
              <IconButton
                variant="none"
                as={FiUser}
                mr="5px"
                w="30px"
                h="30px"
                color="black"
              />
              <Box
                w="100%"
                p={1}
                color="black"
                textAlign="left"
                _hover={{ color: "blue.400" }}
              >
                Profile
              </Box>
            </Button>

            {/* <Button colorScheme="blue" variant="none" w='160px' borderRadius="50px" color="black">
                            <IconButton variant="none" as={DragHandleIcon} mr='5px' w='20px' h='20px' color="black" />
                            <Box w="100%" p={1} color="black" textAlign='left'>
                                More
                            </Box>
                        </Button> */}
            {/* <Menu>
              <MenuButton
                as={Button}
                colorScheme="blue"
                variant="none"
                w="160px"
                borderRadius="full"
                color="black"
                pl="0"
                _hover={{ background: "none", border: "none" }}
                _focus={{ background: "none", border: "none" }}
              >
                <Flex direction="row" ml="5px" alignItems="center" >
                  <Icon
                    as={FiMoreHorizontal}
                    variant="none"
                    w="30px"
                    h="30px"
                    color="black"
                  />
                  <Text ml="15px" >
                    More
                  </Text>
                </Flex>
              </MenuButton>
              <MenuList>
                <MenuItem minH="48px">
                  <ModalSetting user={user} />
                </MenuItem>
                <MenuItem minH="48px">
                  <ModalFollowerRequests user={user} />
                </MenuItem>
              </MenuList>
            </Menu> */}
          </Stack>
          <ModalAddTweet
            user={user}
            content={content}
            setContent={setContent}
            handleAddTweet={handleAddTweet}
          />
          {/* <Button colorScheme="blue" variant="solid" ml={3} mt={10} w='220px' h='50px' borderRadius="50px" color="white">
                        Tweet
                    </Button> */}
        </Flex>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronUpIcon />}
            colorScheme="white"
            variant="solid"
            ml={3}
            mt={185}
            w="240px"
            h="60px"
            borderRadius="50px"
            color="black"
            _hover={{ background: "blue.100", border: "none" }}
            _focus={{ border: "none" }}
          >
            <Flex direction="row" alignItems="center">
              {/* <Image src={user.profileImg} fallbackSrc="placeholdit.com/200x200" alt='img' h='45px' w='45px' borderRadius='full' ml='5px' mr='15px'/> */}
              {user.profileImg ? (
                <Avatar
                  src={user.profileImg}
                  h="40px"
                  w="40px"
                  ml="5px"
                  mr="15px"
                />
              ) : (
                <Avatar h="40px" w="40px" ml="5px" mr="15px" />
              )}
              <Flex direction="column" mr="10px">
                <Text w="100%" ml="5px" color="black" textAlign="left">
                  {user.name}
                </Text>
                <Text w="100%" ml="5px" color="gray.400" textAlign="left">
                  @{user.username}
                </Text>
              </Flex>
            </Flex>
          </MenuButton>
          <MenuList>
            <MenuItem minH="60px" _hover={{ bgColor: "white" }}>
              <Flex direction="row" alignItems="center">
                {/* <Image src={user.profileImg} fallbackSrc="placeholdit.com/200x200" alt='img' h='45px' w='45px' borderRadius='full' ml='5px' mr='15px'/> */}
                {user.profileImg ? (
                  <Avatar
                    name={user.name}
                    src={user.profileImg}
                    ml="5px"
                    mr="15px"
                  />
                ) : (
                  <Avatar />
                )}
                <Flex direction="column" mr="10px">
                  <Box w="100%" ml="5px" color="black">
                    {user.name}
                  </Box>
                  <Box w="100%" ml="5px" color="black">
                    @{user.username}
                  </Box>
                </Flex>
              </Flex>
            </MenuItem>

            <MenuItem minH="60px" onClick={handleLogout}>
              <span>Log out</span>
            </MenuItem>
          </MenuList>
        </Menu>

        {/* <Button colorScheme="white" variant="solid" ml={3} mt={185} w='240px' h='60px' borderRadius="50px" color='black'>
                    <Flex direction='row' alignItems='center'>
                        <Image src='https://bit.ly/sage-adebayo' fallbackSrc="placeholdit.com/200x200" alt='img' h='40px' w='40px' borderRadius='full' ml='10px' mr='8px'/>
                        <Flex direction="column" mr='10px'>
                            <Box w="100%" p={1} color="black">
                                name of user
                            </Box>
                            <Box w="100%" p={1} color="black">
                                @username
                            </Box>
                        </Flex>
                    </Flex>

                    <Button variant="none" alignItems='center'>
                        ...
                    </Button>
                    
                </Button> */}
      </Flex>
    </Box>
  );
}

export default Menulist;
