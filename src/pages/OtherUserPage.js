import Menulist from "../components/banner/Menulist";
import Content from "../components/container/Content";
import TrendBar from "../components/banner/TrendBar";
import OtherUserBio from '../components/other-user/OtherUserBio'
import OtherUserTweets from '../components/other-user/OtherUserTweet'
import { Flex, IconButton, Text, HStack } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from '../config/axios'

function OtherUserPage() {
  const location = useLocation();
  const OtherUserIdParams = location.state.params;
  const [otherUser, setOtherUser] = useState();
  const [isLoading , setIsLoading] = useState(true)
  const [otherUserTweets, setOtherUserTweets] = useState()
  const history = useHistory()

  const getOtherUser = async () => {
    try {
      const res = await axios.get(`/users/other-user/${OtherUserIdParams}`);
      setOtherUser(() => res.data.otherUser);
      setIsLoading(false)
    } catch (err) {}
  };

  useEffect(() => {
    getOtherUser();
  }, []);

  const getOtherUserTweets = async () => {
      try {
        const res = await axios.get(`/tweets/other-user/${OtherUserIdParams}`);
        setOtherUserTweets(() => res.data.tweets);
        setIsLoading(false)
      } catch (err) {}
  }

  useEffect(() => {
    getOtherUserTweets();
  }, []);

  const handleBackButton = () => {
    history.push("/");
  };

  if (isLoading) return <Text>Data is loading</Text>

  return (
    <Flex direction="row">
      <Menulist pathName="OtherUser" />
      <Content
        header={
          <Flex direction="row">
            <HStack spacing={4}>
              <IconButton
                icon={<ArrowBackIcon />}
                color="blue.300"
                bgColor="white"
                _hover={{ background: "white" }}
                _focus={{ background: "white", borderStyle: "none" }}
                size="4xl"
                onClick={handleBackButton}
              />
              <Flex direction="column">
                <Text fontSize="20px" mt="-12px">
                  {otherUser.name}
                </Text>
                <Text fontSize="12px" mt="-5px">
                  500 tweets
                </Text>
              </Flex>
            </HStack>
          </Flex>
        }
      >
        <Flex direction="column">
        <OtherUserBio otherUser={otherUser} />
        <OtherUserTweets otherUserTweets={otherUserTweets}/>
        </Flex>
      </Content>

      <TrendBar />
    </Flex>
  );
}

export default OtherUserPage;
