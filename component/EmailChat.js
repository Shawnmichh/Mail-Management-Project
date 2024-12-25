import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardBody,
  Button, 
  Input,
  Avatar,
  Spinner,
  Chip
} from '@nextui-org/react';
import { ArrowLeft, Send, Calendar } from 'lucide-react';
import { details } from 'framer-motion/client';
import '../styles/globals.css';

const EmailChat = () => {
  const [messages, setMessages] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('/api/fetchEmail');
        const data = await response.json();
        console.log('Fetched messages:', data);
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  const handleReply = async () => {
    if (!reply.trim()) return;

    const newReply = {
      from: 'you@example.com',
      body: reply,
      subject: selectedEmail.subject,
      date: new Date().toISOString(),
    };

    setSelectedEmail({
      ...selectedEmail,
      body: `You: ${reply}`,
    });

    setReply('');
    console.log('Sending reply:', newReply);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  if (!messages.length) {
    return (
      <Card className="empty-messages">
        <CardBody className="text-center">
          <p className="no-messages">No messages found</p>
        </CardBody>
      </Card>
    );
  }

  return (
    <div className="email-chat-container">
      {!selectedEmail ? (
        <div className="message-list">
          <Card className="inbox-header">
            <CardBody>
              <h1 className="inbox-title">Inbox Messages</h1>
            </CardBody>
          </Card>

          {messages.map((message, index) => (
            <Card 
              key={index}
              isPressable
              onPress={() => setSelectedEmail(message)}
              className="message-card"
            >
              <CardBody className="message-body">
                <div className="message-content">
                  <div className="message-header">
                    <div>
                      <h3 className="message-sender">{message.from}</h3>
                      <p className="message-subject">{message.subject}</p>
                    </div>
                    <div className="message-date">
                      <Calendar size={14} className="calendar-icon" />
                      <span>{new Date(message.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <p className="message-snippet">{message.body}</p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      ) : (
        <div className="email-details">
          <Card className="email-details-card">
            <CardBody>
              <div className="email-header">
                <Button
                  isIconOnly
                  variant="light"
                  onPress={() => setSelectedEmail(null)}
                  className="back-button"
                >
                  <ArrowLeft size={24} />
                </Button>
                <h2 className="email-title">Message Details</h2>
              </div>

              <div className="email-content">
                <div className="email-info">
                  <h3>From:</h3>
                  <div className="email-from">
                    <p>{selectedEmail.from}</p>
                    <p className="email-date">{new Date(selectedEmail.date).toLocaleString()}</p>
                  </div>
                  <h4 className="email-subject">Subject: {selectedEmail.subject}</h4>
                  <p className="email-body-text">{selectedEmail.from_name}:{selectedEmail.snippet}</p>                 
                </div>

                <Card className="email-body-card">
                  <CardBody>
                    <p className="email-body-text">{selectedEmail.body}</p>
                  </CardBody>
                </Card>

                <div className="reply-section">
                  <Input
                    value={reply}
                    onValueChange={setReply}
                    placeholder="Type your reply..."
                    variant="bordered"
                    multiline
                    minRows={3}
                    maxRows={6}
                    className="reply-input"
                  />
                  <Button
                    color="primary"
                    endContent={<Send size={16} />}
                    className="send-button"
                    onPress={handleReply}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};

export default EmailChat;