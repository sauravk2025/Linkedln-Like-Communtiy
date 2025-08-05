import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import { Post } from '../lib/supabase'
import { Clock, User } from 'lucide-react'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white font-semibold text-lg">
            {post.profiles.full_name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="font-semibold text-gray-900 truncate">
              {post.profiles.full_name}
            </h3>
            <span className="text-gray-500">•</span>
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <Clock size={14} />
              <span>
                {formatDistanceToNow(new Date(post.created_at), {
                  addSuffix: true,
                })}
              </span>
            </div>
          </div>
          <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>
        </div>
      </div>
    </div>
  )
}