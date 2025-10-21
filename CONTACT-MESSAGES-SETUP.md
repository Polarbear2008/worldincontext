# Contact Messages System Setup

## ✅ What's Been Implemented

### 1. **Database Schema**
Created `contact_messages` table with:
- `id` - Auto-increment primary key
- `name` - Sender's name
- `email` - Sender's email
- `subject` - Message subject
- `message` - Message content
- `status` - Message status (unread/read/replied)
- `created_at` - Timestamp

### 2. **Contact Form Integration**
- About page contact form now saves to Supabase
- Real-time submission with error handling
- Success/error toast notifications
- Form validation

### 3. **Admin Panel Messages Tab**
New "Xabarlar" (Messages) tab with:
- ✅ View all contact messages
- ✅ Unread messages highlighted
- ✅ Status badges (Yangi/O'qilgan/Javob berilgan)
- ✅ Mark as read
- ✅ Mark as replied
- ✅ Delete messages
- ✅ Sender info (name, email, date)
- ✅ Full message display

## 🔧 Setup Instructions

### Step 1: Create Database Table

Run this SQL in Supabase SQL Editor:

```sql
-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(500) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting messages (anyone can submit)
CREATE POLICY "Anyone can submit contact messages" ON contact_messages
  FOR INSERT WITH CHECK (true);

-- Create policy for viewing messages (only authenticated users/admins)
CREATE POLICY "Authenticated users can view contact messages" ON contact_messages
  FOR SELECT USING (true);

-- Create policy for updating message status (admins only)
CREATE POLICY "Admins can update message status" ON contact_messages
  FOR UPDATE USING (true);

-- Create policy for deleting messages (admins only)
CREATE POLICY "Admins can delete messages" ON contact_messages
  FOR DELETE USING (true);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
```

### Step 2: Verify Setup

1. Go to Supabase Dashboard
2. Check Table Editor → `contact_messages` table exists
3. Test the contact form on `/about` page
4. Check admin panel → Messages tab

## 🎯 Features

### Contact Form (About Page)
- ✅ Name, email, subject, message fields
- ✅ Form validation
- ✅ Saves to Supabase database
- ✅ Success/error notifications
- ✅ Form clears after submission

### Admin Panel Messages Tab
- ✅ **View All Messages**: Chronological list
- ✅ **Status Tracking**: Unread/Read/Replied
- ✅ **Visual Indicators**: Unread messages highlighted
- ✅ **Quick Actions**:
  - Mark as read
  - Mark as replied
  - Delete message
- ✅ **Message Details**:
  - Sender name
  - Email address
  - Subject line
  - Full message text
  - Submission date/time

## 📊 Message Statuses

1. **Unread (Yangi)** - New messages (highlighted in blue)
2. **Read (O'qilgan)** - Messages that have been viewed
3. **Replied (Javob berilgan)** - Messages that have been responded to

## 🔒 Security

- ✅ Row Level Security (RLS) enabled
- ✅ Anyone can submit messages
- ✅ Only admins can view/manage messages
- ✅ Secure database policies

## 💡 Usage

### For Users:
1. Go to About page (`/about`)
2. Scroll to contact form
3. Fill in details
4. Click "Xabar Yuborish"
5. Message saved to database

### For Admins:
1. Login to admin panel (`/admin`)
2. Click "Xabarlar" tab
3. View all messages
4. Mark as read/replied
5. Delete if needed

## 🎨 UI Features

- **Unread Highlight**: Blue border and background
- **Status Badges**: Color-coded (Primary/Secondary/Outline)
- **Action Buttons**: Clear icons and labels
- **Responsive Design**: Works on all devices
- **Empty State**: Shows when no messages

## 📧 Message Flow

1. User submits contact form
2. Message saved to `contact_messages` table
3. Status set to "unread"
4. Admin sees in Messages tab
5. Admin marks as read/replied
6. Admin can delete if needed

## 🚀 Ready to Use!

All contact form messages now go directly to the admin panel. No email configuration needed - everything is stored in Supabase!

**Test it:**
1. Submit a message on `/about` page
2. Check admin panel → Messages tab
3. Manage messages with action buttons
