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
        w="17px"
        h="17px"
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

function MainTweet({ myParams, setTriggerReply}) {
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const [replyContent, setReplyContent] = useState("");
  const [tweetIncReply, setTweetIncReply] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getTweetAndReply = async () => {
    try {
      const res = await axios.get(`/tweets/inc-reply/${myParams}`);
      setTweetIncReply(res.data.tweetWithReply.mainTweet);
      setIsLoading(false);
    } catch (err) {}
  };
  console.log(tweetIncReply);

  useEffect(() => {
    getTweetAndReply();
  }, []);

  const handleDeleteTweet = async (tweetId) => {
    try {
      await axios.delete(`/tweets/${tweetId}`);
      // setTriggerDelete((prev) => !prev);
      history.push('/')
    } catch (err) {}
  };

  // const handleBookmarkButton = async (tweetId) => {
  //   try {
  //     await axios.post(`/tweets/bookmark/`, {
  //       content,
  //       userId: user.id,
  //       tweetId,
  //     });
  //   } catch (err) {}
  // };

  const handleDeleteBookmark = async (bookmarkId) => {
    try {
      await axios.delete(`/tweets/bookmarks/${bookmarkId}`);
      // setTriggerDelete((prev) => !prev);
    } catch (err) {}
  };

  const handleReplyTweet = async (tweetId) => {
    await axios.post("/tweets", {
      content: replyContent,
      levelTweetId: 2,
      replyToTweetId: tweetId,
    });
    setReplyContent("");
    setTriggerReply((prev) => !prev);
  };

  const handleRetweet = async (tweetId) => {
    try {
      await axios.post(`/tweets/retweet`, { tweetId });
      await axios.patch(`/tweets/increase-retweet`, { tweetId });
      // setTriggerDelete((prev) => !prev);
    } catch (err) {}
  };

  const handleLikeTweet = async (tweetId) => {
    await axios.patch(`/tweets/increase-like`, { tweetId });
    // setTriggerDelete((prev) => !prev);
  };

  const createdAtDate = new Date(tweetIncReply.createdAt);
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

  if (isLoading) return <Text>loading</Text>;

  return (
    <Flex
      direction="row"
      p="10px 10px 0 10px"
      w="600px"
      borderBottom="solid 1px"
      borderColor="gray.200"
      _hover={{ background: "gray.100" }}
    >
      <Image
        src={tweetIncReply.User.profileImg}
        objectFit="cover"
        alt="imgUser"
        boxSize="50px"
        borderRadius="full"
      />

      <Flex direction="column">
        <Flex
          direction="row"
          alignItems="flex-start"
          ml="10px"
          justify="space-between"
          w="520px"
        >
          <HStack spacing="10px">
            <Text>{tweetIncReply.User.name}</Text>
            <Text color="gray.400">@{tweetIncReply.User.username}</Text>

            {/* <Text color='gray.400'>{Date(createdAt).split(' ').slice(1, 4).join(' ')}</Text> */}
          </HStack>

          {/* <IconButton icon={<SettingsIcon/>} variant="ghost" _hover={{ background: "white" }} _focus={{ background: "white", borderStyle:'none' }} /> */}

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
            />
            <MenuList>
              {user.id === tweetIncReply.User.id && (
              <MenuItem
                icon={<DeleteIcon />}
                onClick={() => handleDeleteTweet(tweetIncReply.id)}
              >
                Delete Tweet
              </MenuItem>
              )}
            </MenuList>
          </Menu>
        </Flex>

        <Text textAlign="left" ml="10px" mt="5px" mb='10px'>
          {tweetIncReply.content}
        </Text>

        <Text color="gray.400" textAlign="left" ml="10px" mb='10px'>{`${
          months[createdAtDate.getMonth()]
        } ${createdAtDate.getDate()}, ${createdAtDate.getFullYear()}`}</Text>
        <hr style={{ marginLeft: 10}} />
        <HStack spacing="20px" my="5px" ml="10px" color='gray.400'>
          {tweetIncReply.retweet ? (
            <Text>{tweetIncReply.retweet} Retweets</Text>
          ) : (
            <Text>0 Retweet</Text>
          )}
          {tweetIncReply.like ? (
            <Text>{tweetIncReply.like} Like</Text>
          ) : (
            <Text>0 Like</Text>
          )}
        </HStack>
        <hr style={{ marginLeft: 10}} />

        <Flex direction="row" m="14px 0 20px">
          <HStack spacing="100px">
            {/* <IconButton _hover={{ background: "blue.100", color: "blue.300", }} variant="ghost" as={ChatIcon} w='17px' h='17px' color="gray.400" borderRadius='full'/> */}
            <ModalAddReply
              replyContent={replyContent}
              setReplyContent={setReplyContent}
              user={user}
              handleReplyTweet={() => handleReplyTweet(tweetIncReply.id)}
            />
            <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<FiRepeat />}
                  variant="ghost"
                  _hover={{ background: "none", color: "green.300" }}
                  _focus={{ background: "white", borderStyle: "none" }}
                  color="gray.400"
                  w="19px"
                  h="19px"
                />

              <MenuList>
                <MenuItem
                  icon={<RepeatIcon />}
                  onClick={() => handleRetweet(tweetIncReply.id)}
                >
                  Retweet
                </MenuItem>
                <MenuItem icon={<EditIcon />}>Quote Tweet</MenuItem>
              </MenuList>
            </Menu>

            {/* <IconButton _hover={{ background: "green.100", color: "green.300", }} variant="ghost" as={RepeatIcon} w='18px' h='18px' color="gray.400" /> */}
              <IconButton
                _hover={{ background: "none", color: "red.400" }}
                color="gray.400"
                variant="ghost"
                as={FiHeart}
                w="17px"
                h="17px"
                onClick={() => handleLikeTweet(tweetIncReply.id)}
              />
              

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
                ml="70px"
              />

              <MenuList>
                {/* {pathName !== "Bookmark" && ( */}
                <MenuItem
                  icon={<EditIcon />}
                  // onClick={() => handleBookmarkButton(id)}
                >
                  Add Tweet to Bookmarks
                </MenuItem>
                {/* )} */}

                {/* {pathName === "Bookmark" && ( */}
                <MenuItem
                  icon={<DeleteIcon />}
                  // onClick={() => handleDeleteBookmark(id)}
                >
                  Remove Tweet from Bookmark
                </MenuItem>
                {/* )} */}
              </MenuList>
            </Menu>
            {/* <IconButton _hover={{ background: "blue.100", color: "blue.300", }} variant="ghost" as={ExternalLinkIcon} w='18px' h='18px' color="gray.400" onClick={() => handleBookmarkButton(id)}/> */}
          </HStack>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default MainTweet;
