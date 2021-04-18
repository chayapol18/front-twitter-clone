import Menulist from '../components/banner/Menulist'
import TrendBar from '../components/banner/TrendBar'
import Content from '../components/container/Content'
import { Flex } from '@chakra-ui/react'
import Bookmark from '../components/tweet/Bookmark'

function BookmarksPage() {
    return(
        <Flex direction='row'>
            <Menulist />
            <Content
                header='Bookmarks'
                body={Bookmark()}
            />   
            <TrendBar />
        </Flex>
    )
}

export default BookmarksPage