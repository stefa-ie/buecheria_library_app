import React from "react";
import { Edit, Trash2, Shield } from "lucide-react";
import { deleteMember } from "../../api/members";

// MemberList component to display a list of members
export default function MemberList({ members, onMemberDeleted, onMemberUpdate}) {
    // Handle member deletion
    const handleDelete = async (memberId) => {
        if (window.confirm('Are you sure you want to delete this member?')) {
            try {
                await deleteMember(memberId);
                onMemberDeleted(memberId);
            } catch (error) {
                console.error('Error deleting member:', error);
                alert('Failed to delete member.')
            }
        }
    }

    if (members.length === 0) {
        return (
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm p-8 text-center">
                <p className="text-gray-500 dark:text-slate-400">No members found.</p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-slate-700/50 border-b border-gray-200 dark:border-slate-600">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                                ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                                Phone
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                                Join Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-600">
                        {members.map((member) => (
                            <tr 
                                key={member.MemberID}
                                className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-slate-200">
                                    {member.MemberID}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-slate-200 font-medium">
                                    {member.FirstName} {member.LastName}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700 dark:text-slate-300">
                                    {member.Email || 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-slate-300">
                                    {member.Phone || 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-slate-300">
                                    {member.JoinDate || 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {member.MembershipStatus === 'Admin' ? (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/30 rounded-full">
                                            <Shield className="w-3 h-3" />
                                            Admin
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-700 dark:text-slate-300 bg-gray-50 dark:bg-slate-700/50 rounded-full">
                                            Member
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => onMemberUpdate(member)}
                                            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-md transition-colors"
                                            title="Edit"
                                        >
                                            <Edit className="w-4 h-4" />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(member.MemberID)}
                                            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

