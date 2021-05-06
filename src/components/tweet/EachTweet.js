import {
  Flex,
  Image,
  Text,
  HStack,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
  Box,
  Avatar,
  Icon,
} from "@chakra-ui/react";
import {
  RepeatIcon,
  SettingsIcon,
  DeleteIcon,
  EditIcon,
  AttachmentIcon,
} from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { BiArrowToTop, BiMessageRounded } from "react-icons/bi";
import { FiHeart, FiRepeat } from "react-icons/fi";
import { useDisclosure } from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import axios from "../../config/axios";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { useHistory } from "react-router-dom";

const ModalAddReply = ({
  replyContent,
  setReplyContent,
  user,
  handleReplyTweet,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton
        onClick={onOpen}
        _hover={{ background: "blue.100", color: "blue.300" }}
        variant="ghost"
        as={BiMessageRounded}
        w="20px"
        h="20px"
        color="gray.400"
        borderRadius="full"
      />
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
              <Image
                src={user.profileImg}
                alt="imgUser"
                h="50px"
                w="50px"
                borderRadius="full"
                mr="5px"
              />
              <Input
                placeholder="Tweet your reply"
                borderStyle="none"
                _focus={{ borderStyle: "none" }}
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
              ></Input>
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

                {replyContent ? (
                  <Button
                    onClick={() => {
                      handleReplyTweet();
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
                      handleReplyTweet();
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
              </HStack>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

function EachTweet({
  id,
  content,
  createdAt,
  like,
  retweets,
  User: { id: userId, name, username, profileImg },
  setTriggerDelete,
  pathName,
  getTweet,
}) {
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const [replyContent, setReplyContent] = useState("");
  const [isRetweet, setIsRetweet] = useState(false);
  const [tweetInRetweets, setTweetInRetweets] = useState([])

  const checkRetweet = async () => {
    try {
      const res = await axios.get(`/tweets/get-retweets-tweet/${id}`);
      if(res.data.retweets) setTweetInRetweets(res.data.retweets);
    } catch (err) {}
  };

  useEffect(() => {
    checkRetweet();
  }, []);

  const handleDeleteTweet = async (tweetId) => {
    try {
      await axios.delete(`/tweets/${tweetId}`);
      setTriggerDelete((prev) => !prev);
    } catch (err) {}
  };

  const handleBookmarkButton = async (tweetId) => {
    try {
      await axios.post(`/tweets/bookmark/`, {
        content,
        userId: user.id,
        tweetId,
      });
    } catch (err) {}
  };

  const handleDeleteBookmark = async (bookmarkId) => {
    try {
      await axios.delete(`/tweets/bookmarks/${bookmarkId}`);
      setTriggerDelete((prev) => !prev);
    } catch (err) {}
  };

  const handleGoToTweet = (tweetId) => {
    history.push("/tweet", { params: tweetId, pathName });
  };

  const handleReplyTweet = async (tweetId) => {
    await axios.post("/tweets", {
      content: replyContent,
      levelTweetId: 2,
      replyToTweetId: tweetId,
    });
    setReplyContent("");
    getTweet();
  };

  const handleRetweet = async (tweetId) => {
    try {
      await axios.post(`/tweets/retweet`, { tweetId });
      await axios.patch(`/tweets/increase-retweet`, { tweetId });
      setTriggerDelete((prev) => !prev);
      setIsRetweet(true);
      // window.location.reload()
    } catch (err) {}
  };

  const handleUndoRetweet = async (tweetId) => {
    try {
      await axios.delete(`/tweets/retweet/${tweetId}`)
      await axios.patch(`/tweets/decrease-retweet`, { tweetId });
      setIsRetweet(false);
      setTriggerDelete((prev) => !prev);
    } catch(err) {

    }
  }

  const handleLikeTweet = async (tweetId) => {
    await axios.patch(`/tweets/increase-like`, { tweetId });
    setTriggerDelete((prev) => !prev);
  };

  const createdAtDate = new Date(createdAt);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <Flex
      direction="row"
      p="10px 10px 0 10px"
      w="600px"
      borderBottom="solid 1px"
      borderColor="gray.200"
      _hover={{ background: "gray.100" }}
    >
      {profileImg ? <Avatar src={profileImg} boxSize="50px" /> : <Avatar />}

      <Flex direction="column">
        <Flex direction="row" alignItems="flex-start" ml="10px">
          <HStack spacing="10px">
            <Text>{name}</Text>
            <Text color="gray.400">@{username}</Text>
            <Text color="gray.400">{`${
              months[createdAtDate.getMonth()]
            } ${createdAtDate.getDate()}, ${createdAtDate.getFullYear()}`}</Text>
          </HStack>
          
        </Flex>

        <Text
          textAlign="left"
          ml="10px"
          mt="5px"
          onClick={() => handleGoToTweet(id)}
        >
          {content}
        </Text>

        <Flex direction="row" m="14px 0 20px">
          <HStack spacing="100px">
            <ModalAddReply
              replyContent={replyContent}
              setReplyContent={setReplyContent}
              user={user}
              handleReplyTweet={() => handleReplyTweet(id)}
            />
            <Menu>
              <HStack
                spacing="-5px"
                _hover={{ background: "none", color: "green.300" }}
                color="gray.400"
              >
                {tweetInRetweets.tweetId === id || isRetweet ? (
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<FiRepeat />}
                    variant="ghost"
                    _hover={{ background: "none", color: "green.300" }}
                    _focus={{ background: "none", borderStyle: "none" }}
                    w="19px"
                    h="19px"
                    color="green.400"
                  />
                ) : (
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<FiRepeat />}
                    variant="ghost"
                    _hover={{ background: "none", color: "green.300" }}
                    _focus={{ background: "none", borderStyle: "none" }}
                    w="19px"
                    h="19px"
                  />
                )}

                {retweets ? (
                  <Text
                    fontSize="12px"
                    _hover={{ background: "none", color: "green.300" }}
                  >
                    {retweets}
                  </Text>
                ) : (
                  <Text fontSize="12px" color="white">
                    0
                  </Text>
                )}
              </HStack>

              {tweetInRetweets.tweetId === id || isRetweet ? (
                <MenuList>
                  <MenuItem
                    icon={<RepeatIcon />}
                    onClick={() => handleUndoRetweet(id)}
                  >
                    Undo Retweet
                  </MenuItem>
                  <MenuItem icon={<EditIcon />}>Quote Tweet</MenuItem>
                </MenuList>
              ) : (
                <MenuList>
                  <MenuItem
                    icon={<RepeatIcon />}
                    onClick={() => handleRetweet(id)}
                  >
                    Retweet
                  </MenuItem>
                  <MenuItem icon={<EditIcon />}>Quote Tweet</MenuItem>
                </MenuList>
              )}
            </Menu>

            <HStack
              spacing="-5px"
              _hover={{ background: "none", color: "red.400" }}
              color="gray.400"
            >
              <IconButton
                _hover={{ background: "none", color: "red.400" }}
                variant="ghost"
                as={FiHeart}
                w="17px"
                h="17px"
                onClick={() => handleLikeTweet(id)}
              />
              {like ? (
                <Text
                  fontSize="12px"
                  _hover={{ background: "none", color: "red.400" }}
                >
                  {like}
                </Text>
              ) : (
                <Text fontSize="12px" color="white">
                  0
                </Text>
              )}
            </HStack>

            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<Icon as={BiArrowToTop} w="20px" h="20px" />}
                variant="ghost"
                _hover={{ background: "blue.100", color: "blue.300" }}
                _focus={{ background: "white", borderStyle: "none" }}
                w="19px"
                h="19px"
                color="gray.400"
              />

              <MenuList>
                {pathName !== "Bookmark" && (
                  <MenuItem
                    icon={<EditIcon />}
                    onClick={() => handleBookmarkButton(id)}
                  >
                    Add Tweet to Bookmarks
                  </MenuItem>
                )}

                {pathName === "Bookmark" && (
                  <MenuItem
                    icon={<DeleteIcon />}
                    onClick={() => handleDeleteBookmark(id)}
                  >
                    Remove Tweet from Bookmark
                  </MenuItem>
                )}
              </MenuList>
            </Menu>
          </HStack>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<SettingsIcon />}
              variant="ghost"
              _hover={{ background: "blue.100", color: "blue.300" }}
              _focus={{ background: "white", borderStyle: "none" }}
              h="30px"
              w="30px"
              color="gray.400"
              mt='-68px'
              ml='25px'
            />
            <MenuList>
              {user.id === userId && (
                <MenuItem
                  icon={<DeleteIcon />}
                  onClick={() => handleDeleteTweet(id)}
                >
                  Delete Tweet
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default EachTweet;
