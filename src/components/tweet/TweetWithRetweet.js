import {
  Flex,
  Image,
  Text,
  HStack,
  Button,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
  Box,
  Avatar,
} from "@chakra-ui/react";
import {
  RepeatIcon,
  ExternalLinkIcon,
  ChatIcon,
  StarIcon,
  SettingsIcon,
  DeleteIcon,
  DownloadIcon,
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
import { useDisclosure } from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import { BiArrowToTop, BiMessageRounded } from "react-icons/bi";
import { FiHeart, FiRepeat } from "react-icons/fi";
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

function TweetWithReTweet({
  id,
  content,
  createdAt,
  Tweet: {
    id: mainTweetId,
    content: contentMainTweet,
    createdAt: tweetCreatedAt,
    like,
    retweets,
    User: {
      id: mainTweetUserId,
      name: mainTweetNameOfUser,
      username: mainTweetUsername,
      profileImg,
    },
  },
  User: { id: userId, name, username },
  setTriggerDelete,
  pathName,
  getMyTweet,
}) {

  const { user } = useContext(AuthContext);
  const history = useHistory();
  const [replyContent, setReplyContent] = useState("");

  const [isRetweet, setIsRetweet] = useState(false);
  const [tweetInRetweets, setTweetInRetweets] = useState([]);

  const checkRetweet = async () => {
    try {
      const res = await axios.get(`/tweets/get-retweets-tweet/${mainTweetId}`);
      if (res.data.retweets) setTweetInRetweets(res.data.retweets);
    } catch (err) {}
  };

  useEffect(() => {
    checkRetweet();
  }, [isRetweet]);

  const handleDeleteTweet = async (tweetId) => {
    try {
      //await axios.delete(`/tweets/bookmarks/${tweetId}`)
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
    getMyTweet();
  };

  const handleRetweet = async (tweetId) => {
    try {
      await axios.post(`/tweets/retweet`, { tweetId });
      await axios.patch(`/tweets/increase-retweet`, { tweetId });
      setTriggerDelete((prev) => !prev);
    } catch (err) {}
  };

  const handleLikeTweet = async (tweetId) => {
    await axios.patch(`/tweets/increase-like`, { tweetId });
    setTriggerDelete((prev) => !prev);
  };

  const handleUndoRetweet = async (tweetId) => {
    try {
      await axios.delete(`/tweets/retweet/${tweetId}`);
      await axios.patch(`/tweets/decrease-retweet`, { tweetId });
      setIsRetweet(false);
      setTriggerDelete((prev) => !prev);
    } catch (err) {}
  };

  const createdAtDate = new Date(tweetCreatedAt);
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
      direction="column"
      _hover={{ background: "gray.100" }}
      w="600px"
      p="5px 10px 0 10px"
      borderBottom="solid 1px"
      borderColor="gray.200"
    >
      <Flex direction="row" ml="38px" mb="5px" color="gray.400">
        <Icon as={FiRepeat} mt="3px" mr="6px" />
        <Text fontSize="13px" fontWeight="700">
          {user.name} Retweeted
        </Text>
      </Flex>

      <Flex direction="row">
        {profileImg ? <Avatar src={profileImg} boxSize="50px" /> : <Avatar />}

        <Flex direction="column">
          <Flex direction="row" alignItems="flex-start" ml="10px">
            <HStack spacing="10px">
              <Text>{mainTweetNameOfUser}</Text>
              <Text color="gray.400">@{mainTweetUsername}</Text>
              <Text color="gray.400">{`${
                months[createdAtDate.getMonth()]
              } ${createdAtDate.getDate()}, ${createdAtDate.getFullYear()}`}</Text>
              {/* <Text color='gray.400'>{Date(createdAt).split(' ').slice(1, 4).join(' ')}</Text> */}
            </HStack>

            {/* <IconButton icon={<SettingsIcon/>} variant="ghost" _hover={{ background: "white" }} _focus={{ background: "white", borderStyle:'none' }} /> */}
          </Flex>

          <Text
            textAlign="left"
            ml="10px"
            mt="5px"
            onClick={() => handleGoToTweet(mainTweetId)}
          >
            {contentMainTweet}
          </Text>

          <Flex direction="row" m="14px 0 20px">
            <HStack spacing="100px">
              {/* <IconButton _hover={{ background: "blue.100", color: "blue.300", }} variant="ghost" as={ChatIcon} w='17px' h='17px' color="gray.400" borderRadius='full'/> */}
              <ModalAddReply
                replyContent={replyContent}
                setReplyContent={setReplyContent}
                user={user}
                handleReplyTweet={() => handleReplyTweet(mainTweetId)}
              />
              <Menu>
                <HStack
                  spacing="-5px"
                  _hover={{ background: "none", color: "green.300" }}
                  color="gray.400"
                >
                  {tweetInRetweets.tweetId === mainTweetId ? (
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

                {tweetInRetweets.tweetId === mainTweetId ? (
                  <MenuList>
                    <MenuItem
                      icon={<RepeatIcon />}
                      onClick={() => handleUndoRetweet(mainTweetId)}
                    >
                      Undo Retweet
                    </MenuItem>
                    <MenuItem icon={<EditIcon />}>Quote Tweet</MenuItem>
                  </MenuList>
                ) : (
                  <MenuList>
                    <MenuItem
                      icon={<RepeatIcon />}
                      onClick={() => handleRetweet(mainTweetId)}
                    >
                      Retweet
                    </MenuItem>
                    <MenuItem icon={<EditIcon />}>Quote Tweet</MenuItem>
                  </MenuList>
                )}
              </Menu>

              {/* <IconButton _hover={{ background: "green.100", color: "green.300", }} variant="ghost" as={RepeatIcon} w='18px' h='18px' color="gray.400" /> */}
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
                  onClick={() => handleLikeTweet(mainTweetId)}
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
                      onClick={() => handleBookmarkButton(mainTweetId)}
                    >
                      Add Tweet to Bookmarks
                    </MenuItem>
                  )}

                  {pathName === "Bookmark" && (
                    <MenuItem
                      icon={<DeleteIcon />}
                      onClick={() => handleDeleteBookmark(mainTweetId)}
                    >
                      Remove Tweet from Bookmark
                    </MenuItem>
                  )}
                </MenuList>
              </Menu>
              {/* <IconButton _hover={{ background: "blue.100", color: "blue.300", }} variant="ghost" as={ExternalLinkIcon} w='18px' h='18px' color="gray.400" onClick={() => handleBookmarkButton(id)}/> */}
            </HStack>

            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<SettingsIcon />}
                variant="ghost"
                _hover={{ background: "blue.100", color: "blue.300" }}
                _focus={{ background: "white", borderStyle: "none" }}
                h="25px"
                w="30px"
                color="gray.400"
                mt="-68px"
                ml="25px"
              />
              <MenuList>
                {user.id === mainTweetUserId && (
                  <MenuItem
                    icon={<DeleteIcon />}
                    onClick={() => handleDeleteTweet(mainTweetId)}
                  >
                    Delete Tweet
                  </MenuItem>
                )}
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default TweetWithReTweet;
