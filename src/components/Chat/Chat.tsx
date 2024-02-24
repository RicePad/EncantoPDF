import React from 'react';
import { Input} from '../ui/input';
import { Button } from '../ui/button';
import { Bot, Send, User } from 'lucide-react';
import { cn } from '@/lib/utils';


function Chat() {

  const messages = 
  [
    {
      role: 'user',
      content: 'dasddasddadas'
    },

    {
      role: 'assistant',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor ante vel justo tristique, quis posuere elit consectetur. Vivamus interdum magna id sapien tempus, a tincidunt dui consequat. Nulla facilisi. Sed vel dolor nec est sodales venenatis. Integer in nisi ac est sollicitudin rhoncus. Sed tincidunt euismod est, in volutpat odio consequat non. Nam nec felis eros. Maecenas eget consectetur libero. Sed sit amet tortor sit amet mauris pharetra tincidunt. Sed euismod neque in metus fringilla fringilla. In lobortis, libero a viverra consequat, magna lectus lacinia leo, vel vulputate velit ex at velit.'

      
    },
    {
      role: 'user',
      content: 'dasddasddadas'
    },

    {
      role: 'assistant',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor ante vel justo tristique, quis posuere elit consectetur. Vivamus interdum magna id sapien tempus, a tincidunt dui consequat. Nulla facilisi. Sed vel dolor nec est sodales venenatis. Integer in nisi ac est sollicitudin rhoncus. Sed tincidunt euismod est, in volutpat odio consequat non. Nam nec felis eros. Maecenas eget consectetur libero. Sed sit amet tortor sit amet mauris pharetra tincidunt. Sed euismod neque in metus fringilla fringilla. In lobortis, libero a viverra consequat, magna lectus lacinia leo, vel vulputate velit ex at velit.'


    },
  ]
  
  return (
    <div className="w-1/2 h-[calc(100vh-60px)] overflow-scroll bg-white">
      <div className="h-full flex flex-col justify-between">
        {/* Messages */}
        <div className="overflow-auto bg-white">
          <div className="flex flex-col">
          {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "p-6 w-full flex items-start gap-x-8",
                  message.role === "user" ? "bg-white" : "bg-[#faf9f6]"
                )}
              >
                <div className="w-4">
                  {message.role === "user" ? (
                    <User className="bg-[#ff612f] text-white rounded-sm p-1" />
                  ) : (
                    <Bot className="bg-[#062427] text-white rounded-sm p-1" />
                  )}
                </div>
                <div className="text-sm font-light overflow-hidden leading-7">
                  {message.content}
                </div>
              </div>
            ))}

          </div>
          <div ></div>
        </div>

        {/* Form */}
        <div className="bg-[#faf9f6]">
          <form
            className="m-4 p-2 flex items-center justify-between rounded-md border-[#e5e3da] border bg-white"
          >
            <Input
              placeholder="Enter your question"
              className="border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent"
            />
            
              <Button variant="orange" type="submit">
                <Send className="w-4 h-4" />
              </Button>
            
          </form>
        </div>
      </div>
    </div>
  )
}

export default Chat;
