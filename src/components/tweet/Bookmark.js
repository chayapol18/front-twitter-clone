import { Flex, Box } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import EachTweet from '../tweet/EachTweet'
import axios from '../../config/axios'

function Bookmark({pathName}) {
    const [bookmark, setBookmark] = useState([])
    const [triggerDelete, setTriggerDelete] = useState(false)

    const getBookmark = async () => {
        try {
            const res = await axios.get('/tweets/bookmarks')
            const data = res.data.tweets
            const getBookmark = data.map(item => (
                item.Tweet
            ))
            setBookmark(getBookmark)
            console.log(res.data)
            console.log(res.data.tweets)
        } catch (err) {

        }
    };
    
    useEffect(() => {
        getBookmark()
    }, [triggerDelete])

    console.log(bookmark)
    return (
        <Flex direction='column'>

            { bookmark.map(tweet => (
                <EachTweet key={tweet.id} {...tweet} setTriggerDelete={setTriggerDelete} pathName={pathName} />
            ))}
        </Flex>
    )
}

export default Bookmark