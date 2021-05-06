import Menulist from "../components/banner/Menulist";
import TrendBar from "../components/banner/TrendBar";
import Content from "../components/container/Content";
import { Text, Flex, Button, Grid, GridItem } from "@chakra-ui/react";
import Tweets from "../components/tweet/Tweets";
import { useContext, useEffect, useState } from "react";
import axios from "../config/axios";
import { AuthContext } from "../contexts/AuthContextProvider";


function Home() {
  const [tweet, setTweet] = useState([]);
  const [triggerDelete, setTriggerDelete] = useState(false);

  const getTweet = async () => {
    try {
      const res = await axios.get("/tweets");
      setTweet(res.data.tweets);
    } catch (err) {}
  };

  useEffect(() => {
    getTweet();
  }, [triggerDelete]);


  return (
    <Flex direction='row'>
        <Menulist
            pathName='Home'
            getTweet={getTweet}
        />

        <Content header='Home'>
            <Tweets
            pathName='Home'
            tweet={tweet}
            setTriggerDelete={setTriggerDelete}
            getTweet={getTweet}
            />
        </Content>

        <TrendBar />
    </Flex>
  );
}

export default Home;
