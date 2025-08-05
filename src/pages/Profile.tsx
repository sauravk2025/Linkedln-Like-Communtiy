import React, { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { supabase, Post } from '../lib/supabase'
import { PostCard } from '../components/PostCard'
import { Edit2, Save, X, Mail, Calendar, Loader2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

export function Profile() {
  const { user, profile, updateProfile } = useAuth()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    full_name: '',
    bio: '',
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (profile) {
      setEditForm({
        full_name: profile.full_name || '',
        bio: profile.bio || '',
      })
    }
  }, [profile])

  const fetchUserPosts = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles (
            id,
            full_name,
            email,
            bio,
            created_at,
            updated_at
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (error) {
      console.error('Error fetching user posts:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      fetchUserPosts()
    }
  }, [user?.id])

  const handleSave = async () => {
    if (!editForm.full_name.trim()) {
      return
    }

    setSaving(true)
    try {
      const { error } = await updateProfile({
        full_name: editForm.full_name,
        bio: editForm.bio,
        updated_at: new Date().toISOString(),
      })

      if (error) throw error
      setEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setEditForm({
      full_name: profile?.full_name || '',
      bio: profile?.bio || '',
    })
    setEditing(false)
  }

  if (!profile || !user) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-3xl">
                {profile.full_name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <div className="flex-1">
              {editing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editForm.full_name}
                    onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                    className="text-2xl font-bold text-gray-900 border-b-2 border-blue-500 bg-transparent focus:outline-none"
                    placeholder="Your full name"
                    required
                  />
                  <textarea
                    value={editForm.bio}
                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="Tell us about yourself..."
                    maxLength={200}
                  />
                  <p className="text-sm text-gray-500">{editForm.bio.length}/200 characters</p>
                </div>
              ) : (
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {profile.full_name || 'User'}
                  </h1>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {profile.bio || 'No bio added yet.'}
                  </p>
                </div>
              )}
              
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Mail size={16} />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar size={16} />
                  <span>
                    Joined {formatDistanceToNow(new Date(profile.created_at), { addSuffix: true })}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {editing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={saving || !editForm.full_name.trim()}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                  <span>Save</span>
                </button>
                <button
                  onClick={handleCancel}
                  disabled={saving}
                  className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <X size={16} />
                  <span>Cancel</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Edit2 size={16} />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          My Posts ({posts.length})
        </h2>
        
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="animate-spin text-blue-600" size={32} />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-600">Start sharing your thoughts with the community!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}