const recentChats = [
  {
    id: 1,
    name: 'Sarah Wilson',
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616b86c0f78?w=150&h=150&fit=crop&crop=face',
    lastMessage: "Hey! How's the project going?",
    timestamp: '2m ago',
    unreadCount: 2,
    isOnline: true,
    type: 'direct',
  },
  {
    id: 2,
    name: 'Design Team',
    avatar: null,
    lastMessage: "Mike: I'll have the mockups ready by tomorrow",
    timestamp: '5m ago',
    unreadCount: 0,
    isOnline: false,
    type: 'group',
  },
  {
    id: 3,
    name: 'Alex Johnson',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    lastMessage: 'Thanks for the help with the code review!',
    timestamp: '1h ago',
    unreadCount: 0,
    isOnline: true,
    type: 'direct',
  },
  {
    id: 4,
    name: 'Marketing Team',
    avatar: null,
    lastMessage: 'Lisa: The campaign is ready for review',
    timestamp: '2h ago',
    unreadCount: 1,
    isOnline: false,
    type: 'group',
  },
  {
    id: 5,
    name: 'Emma Davis',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    lastMessage: 'See you at the meeting tomorrow!',
    timestamp: '3h ago',
    unreadCount: 0,
    isOnline: false,
    type: 'direct',
  },
  {
    id: 6,
    name: 'Development Team',
    avatar: null,
    lastMessage: 'John: Bug fixes are deployed to staging',
    timestamp: '5h ago',
    unreadCount: 3,
    isOnline: false,
    type: 'group',
  },
  {
    id: 7,
    name: 'Michael Chen',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    lastMessage: "Perfect! Let's schedule that call",
    timestamp: '1d ago',
    unreadCount: 0,
    isOnline: false,
    type: 'direct',
  },
];

export default recentChats;
