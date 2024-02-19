import "./Discussion.css"
import "./react-chat-elements.css"

import { MessageBox, Input, Avatar } from 'react-chat-elements'

export default function Discussion() {
    return (
        <div className="discussion_container">
            <div className="discussion_header"><h2 className="discussion_h2">Discussion with Luis</h2></div>
            <div className="discussion_content">
                <MessageBox
                    title='Luis Juncos'
                    avatar={"https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"}
                    position={'left'}
                    type={'text'}
                    text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed imperdiet id neque nec accumsan. Quisque id congue ipsum, rutrum tempor magna. Fusce ante arcu, tempor vitae euismod eget, vulputate eu eros. Suspendisse laoreet pharetra magna eu euismod. Nulla et faucibus nisi. Proin gravida ligula eget placerat fermentum. Vestibulum lacinia et nisi vitae posuere. Mauris at suscipit metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris sit amet augue elementum orci pretium suscipit. Sed blandit vel nisl mollis luctus.'}
                    date={new Date()}
                />
                <MessageBox
                    title='Me'
                    position={'right'}
                    type={'text'}
                    text={'t'}
                    date={"e"}
                    dateString={"15h05"}
                />
                <MessageBox
                    title='Me'
                    position={'right'}
                    type={'text'}
                    text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eleifend, ipsum id pharetra venenatis, quam dui imperdiet velit, vitae finibus eros ex at magna. Aliquam pellentesque nibh eget tellus viverra dignissim posuere vitae lacus. Donec facilisis blandit lectus vitae ultricies. Aenean fermentum ultrices condimentum. Donec ut neque ac tortor ultricies viverra sed vel urna. Praesent quis placerat diam, sit amet consequat purus.'}
                    date={"e"}
                    dateString={"15/03 15h05"}
                />
                <MessageBox
                    title='Me'
                    position={'right'}
                    type={'text'}
                    text={'test'}
                    date={new Date()}
                />
                <MessageBox
                    title='Me'
                    position={'right'}
                    type={'text'}
                    text={'ttteeeesst'}
                    date={new Date()}
                />
                <MessageBox
                    title='Me'
                    position={'right'}
                    type={'text'}
                    text={'react.svg'}
                    date={new Date()}
                />
                <MessageBox
                    title='Me'
                    position={'right'}
                    type={'text'}
                    text={'react.svg'}
                    date={new Date()}
                />
                <MessageBox
                    title='Me'
                    position={'right'}
                    type={'text'}
                    text={'react.svg'}
                    date={new Date()}
                />
                <MessageBox
                    title='Me'
                    position={'right'}
                    type={'text'}
                    text={'react.svg'}
                    date={new Date()}
                />
                <MessageBox
                    title='Me'
                    position={'right'}
                    type={'text'}
                    text={'react.svg'}
                    date={new Date()}
                />
                {/* <MessageBox
                    title='Me'
                    position={'right'}
                    type={'text'}
                    text={'react.svg'}
                    date={new Date()}
                />
                <MessageBox
                    title='Me'
                    position={'right'}
                    type={'text'}
                    text={'react.svg'}
                    date={new Date()}
                />
                <MessageBox
                    title='Me'
                    position={'right'}
                    type={'text'}
                    text={'react.svg'}
                    date={new Date()}
                /> */}
            </div>
            <div className="discussion_input">
                <Input
                    placeholder="Chat here..."
                    multiline={true}
                />
            </div>
        </div>
    )
}