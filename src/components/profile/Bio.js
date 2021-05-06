import {
  Flex,
  Text,
  Box,
  Image,
  Avatar,
  Button,
  IconButton,
  Stack,
  HStack,
  Input,
  Link,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Icon,
  FormControl,
  FormLabel,
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
import { useContext, useEffect, useState } from "react";
import {
  CalendarIcon,
  PlusSquareIcon,
  DeleteIcon,
  InfoOutlineIcon,
} from "@chakra-ui/icons";
import { AuthContext } from "../../contexts/AuthContextProvider";
import axios from "../../config/axios";
import { useHistory } from "react-router-dom";
import { IconBase } from "react-icons/lib";

const EditProfileModal = ({
  user,
  updateUser,
  handleUpdateChange,
  handleEditProfileButton,
  handleFileChange,
  handleUpload,
  file,
  userImg,
  handleBackgroundChange,
  handleBackgroundUpload,
  backgroundFile,
  userBackground,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        mt="15px"
        bgColor="white"
        border="solid 1px"
        borderRadius="full"
        color="blue.400"
      >
        Edit Profile
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontWeight="700">Edit profile</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" h="190px" w="100%">
              {userBackground ? (
                <Image
                  src={userBackground}
                  alt="background img"
                  h="100%"
                  objectFit="cover"
                />
              ) : user.backgroundImg ? (
                <Image
                  src={user.backgroundImg}
                  alt="background img"
                  h="100%"
                  objectFit="cover"
                />
              ) : (
                <Image src="" h="100%" objectFit="cover" bgColor="gray.400" />
              )}
              <Flex direction="row" m="auto">
                <FormControl id="inputBackgroundImg">
                  <FormLabel position="absolute" mt="-75px">
                    <IconButton
                      as={PlusSquareIcon}
                      color="white"
                      h="20px"
                      w="20px"
                      mt="-60px"
                      variant="ghost"
                      ml="80px"
                    />
                  </FormLabel>
                  <Input
                    type="file"
                    onChange={handleBackgroundChange}
                    display="none"
                    id="inputBackgroundImg"
                    mt="-150px"
                    ml="43px"
                  />
                  <Button
                    _hover={{ borderStyle: "none", color: "blue.400" }}
                    _focus={{
                      borderStyle: "none",
                      color: "blue.200",
                      background: "none",
                    }}
                    variant="ghost"
                    onClick={(e) => handleBackgroundUpload(e)}
                    ml="50px"
                    isDisabled={backgroundFile ? false : true}
                  >
                    Upload Background
                  </Button>
                </FormControl>
                <IconButton
                  as={DeleteIcon}
                  color="white"
                  h="20px"
                  w="20px"
                  mt="-103px"
                  ml="-50px"
                  variant="ghost"
                />
              </Flex>
            </Flex>
            {userImg ? (
              <Avatar
                name="user avatar"
                src={userImg}
                mt="-68px"
                size="2xl"
                border="solid 5px white"
              />
            ) : user.profileImg ? (
              <Avatar
                name="user avatar"
                src={user.profileImg}
                mt="-68px"
                size="2xl"
                border="solid 5px white"
              />
            ) : (
              <Avatar mt="-68px" size="2xl" border="solid 5px white" />
            )}
            <FormControl id="inputUserImg">
              <FormLabel position="absolute" mt="-75px" ml="43px">
                <IconButton
                  as={PlusSquareIcon}
                  color="white"
                  h="20px"
                  w="20px"
                  variant="ghost"
                />
              </FormLabel>
              <Input
                type="file"
                onChange={handleFileChange}
                display="none"
                id="inputUserImg"
                mt="-150px"
                ml="43px"
              />
              <Button
                _hover={{ borderStyle: "none", color: "blue.400" }}
                _focus={{
                  borderStyle: "none",
                  color: "blue.200",
                  background: "none",
                }}
                variant="ghost"
                onClick={(e) => handleUpload(e)}
                ml="-5px"
                isDisabled={file ? false : true}
              >
                Upload Profile
              </Button>
            </FormControl>

            <Stack spacing={3}>
              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Name"
                  type="text"
                  name="name"
                  value={updateUser.name}
                  onChange={handleUpdateChange}
                />
              </FormControl>

              <FormControl id="bio" isRequired>
                <FormLabel>Bio</FormLabel>
                <Input
                  placeholder="Bio"
                  type="text"
                  name="bio"
                  value={updateUser.bio}
                  onChange={handleUpdateChange}
                />
              </FormControl>

              <FormControl id="location" isRequired>
                <FormLabel>Location</FormLabel>
                <Input
                  placeholder="Location"
                  type="text"
                  name="location"
                  value={updateUser.location}
                  onChange={handleUpdateChange}
                />
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={() => {
                handleEditProfileButton();
                onClose();
                window.location.reload()
              }}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

function Bio({ getMe, setToggleUpdate }) {
  const { user, setUser } = useContext(AuthContext);
  const history = useHistory();
  const [numberFollowing, setNumberFollowing] = useState([]);
  const [numberFollower, setNumberFollower] = useState([]);
  const [updateUser, setUpdateUser] = useState({
    name: user.name,
    bio: user.bio,
    location: user.location,
  });
  const [file, setFile] = useState(null);
  const [userImg, setUserImg] = useState("");
  const [backgroundFile, setBackgroundFile] = useState(null);
  const [userBackground, setUserBackground] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    axios
      .patch("/users/user-img", formData)
      .then((res) => {
        setUserImg(res.data.user.profileImg);
      })
      .catch((err) => console.log(err));
  };

  const handleBackgroundChange = (e) => {
    setBackgroundFile(e.target.files[0]);
    console.log(e.target);
  };

  const handleBackgroundUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("backgroundImage", backgroundFile);
    axios
      .patch("/users/background-img", formData)
      .then((res) => {
        setUserBackground(res.data.user.backgroundImg);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditProfileButton = () => {
    axios
      .patch("/users/update-profile", {
        name: updateUser.name,
        bio: updateUser.bio,
        location: updateUser.location,
      })
      .catch((err) => {
        console.log(err);
      });
    setToggleUpdate((prev) => !prev);
  };

  const [following, setFollowing] = useState([]);
  const [follower, setFollower] = useState([]);

  const getFollow = async () => {
    try {
      const resNumberFollowing = await axios.get(
        "/follows/number-of-following"
      );
      const resNumberFollower = await axios.get("/follows/number-of-follower");
      const resFollowing = await axios.get("/follows/following");
      const resFollower = await axios.get("/follows/follow-by");

      setNumberFollowing(resNumberFollowing.data.following);
      setNumberFollower(resNumberFollower.data.follower);
      setFollowing(resFollowing.data.following);
      setFollower(resFollower.data.followBy);
    } catch (err) {}
  };

  useEffect(() => {
    getFollow();
  }, []);

  const handleFollowButton = () => {
    history.push("/follow");
  };

  const createdAtDate = new Date(user.createdAt);
  const userBirthDate = new Date(user.birthDate);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <Flex direction="column" w="600px" h="460px">
      {user.backgroundImg ? (
        <Image
          src={user.backgroundImg}
          alt="background img"
          h="190px"
          objectFit="cover"
        />
      ) : (
        <Image src="" bgColor="gray.400" h="190px" objectFit="cover" />
      )}
      <Flex dir="row" justify="space-between" mx="15px" h="60px">
        {user.profileImg ? (
          <Avatar
            name={user.name}
            src={user.profileImg}
            mt="-68px"
            size="2xl"
            border="solid 5px white"
          ></Avatar>
        ) : (
          <Avatar mt="-68px" size="2xl" border="solid 5px white" />
        )}
        <EditProfileModal
          user={user}
          updateUser={updateUser}
          setUpdateUser={setUpdateUser}
          handleUpdateChange={handleUpdateChange}
          handleEditProfileButton={handleEditProfileButton}
          handleFileChange={handleFileChange}
          handleUpload={handleUpload}
          file={file}
          userImg={userImg}
          handleBackgroundChange={handleBackgroundChange}
          handleBackgroundUpload={handleBackgroundUpload}
          backgroundFile={backgroundFile}
          userBackground={userBackground}
        />
      </Flex>

      <Flex direction="column" textAlign="left" ml="20px">
        <Stack spacing={3}>
          <Box>
            <Text fontWeight="700" fontSize="25px">
              {user.name}
            </Text>
            <Text color="gray.400" mt="-5px">
              @{user.username}
            </Text>
          </Box>
          {user.bio ? <Text h="50px">{user.bio}</Text> : null}
          <Text color="gray.500">
            {" "}
            <InfoOutlineIcon mb="2px" /> Born{" "}
            {`${
              months[userBirthDate.getMonth()]
            } ${userBirthDate.getDate()}, ${userBirthDate.getFullYear()}`}
            <CalendarIcon ml="15px" mb="2px" /> Joined{" "}
            {`${
              months[createdAtDate.getMonth()]
            } ${createdAtDate.getFullYear()}`}{" "}
          </Text>
        </Stack>
      </Flex>

      <Flex direction="row" ml="5px" mt="10px">
        <Button
          variant="ghost"
          onClick={handleFollowButton}
          _hover={{ textDecoration: "underline" }}
        >
          <HStack spacing={1}>
            <Text fontWeight="700">{numberFollowing.count}</Text>
            <Text color="gray.400">Following</Text>
          </HStack>
        </Button>
        <Button
          variant="ghost"
          onClick={handleFollowButton}
          _hover={{ textDecoration: "underline" }}
        >
          <HStack spacing={1}>
            <Text fontWeight="700">{numberFollower.count}</Text>
            <Text color="gray.400">Follower</Text>
          </HStack>
        </Button>
      </Flex>
    </Flex>
  );
}

export default Bio;
