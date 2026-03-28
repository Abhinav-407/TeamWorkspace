// src/pages/Dashboard.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Loader2, AlertCircle, FolderKanban, Trash2 } from 'lucide-react'
import api from '../api/axios'

const fetchWorkspaces = async () => {
  const response = await api.get('/workspaces')
  return response.data.data
}

const createWorkspace = async (data) => {
  const response = await api.post('/workspaces', data)
  return response.data.data
}

const deleteWorkspace = async (id) => {
  await api.delete(`/workspaces/${id}`)
}

export default function Dashboard() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const {
    data: workspaces,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['workspaces'],
    queryFn: fetchWorkspaces
  })

  const createMutation = useMutation({
    mutationFn: createWorkspace,
    onSuccess: () => {
      queryClient.invalidateQueries(['workspaces'])
      setName('')
      setDescription('')
      setShowForm(false)
    }
  })

  const deleteMutation = useMutation({
    mutationFn: deleteWorkspace,
    onSuccess: () => {
      queryClient.invalidateQueries(['workspaces'])
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    createMutation.mutate({ name, description })
  }

  const handleDelete = (e, id) => {
    e.stopPropagation() // prevents navigating to workspace when clicking delete
    if (window.confirm('Are you sure you want to delete this workspace?')) {
      deleteMutation.mutate(id)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-indigo-600" size={32} />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex items-center gap-2 text-red-500 p-4 bg-red-50 rounded-md">
        <AlertCircle size={20} />
        <span>{error?.message || 'Failed to load workspaces'}</span>
      </div>
    )
  }

  return (
    <div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Your Workspaces</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          <Plus size={16} />
          New Workspace
        </button>
      </div>

      {/* Create Workspace Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Create a Workspace
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Workspace Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="e.g. Acme Engineering"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description (optional)
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What is this workspace for?"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {createMutation.isError && (
              <p className="text-sm text-red-500">
                {createMutation.error?.response?.data?.message || 'Failed to create workspace'}
              </p>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={createMutation.isPending}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
              >
                {createMutation.isPending ? 'Creating...' : 'Create Workspace'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>

          </form>
        </div>
      )}

      {/* Workspaces Grid */}
      {workspaces?.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <FolderKanban size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium">No workspaces yet</p>
          <p className="text-sm">Create your first workspace to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {workspaces?.map((workspace) => (
            <div
              key={workspace._id}
              onClick={() => navigate(`/workspace/${workspace._id}`)}
              className="relative bg-white rounded-lg shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md hover:border-indigo-300 transition-all"
            >
              {/* Delete Button */}
              <button
                onClick={(e) => handleDelete(e, workspace._id)}
                className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
              >
                <Trash2 size={15} />
              </button>

              {/* Workspace Initial */}
              <div className="w-10 h-10 rounded-md bg-indigo-600 text-white flex items-center justify-center font-bold text-lg mb-4">
                {workspace.name.charAt(0).toUpperCase()}
              </div>

              <h3 className="text-base font-semibold text-gray-800 mb-1">
                {workspace.name}
              </h3>

              {workspace.description && (
                <p className="text-sm text-gray-500 truncate">
                  {workspace.description}
                </p>
              )}

              <p className="text-xs text-gray-400 mt-3">
                {workspace.members?.length || 1} member{workspace.members?.length !== 1 ? 's' : ''}
              </p>

            </div>
          ))}
        </div>
      )}

    </div>
  )
}