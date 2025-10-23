import React from "react";
import { deleteMember } from "../../api/members";

// MemberList component to display a list of members
export default function MemberList({ members, onMemberDeleted, onMemberUpdate}) {
    // Handle member deletion
    const handleDelete = async (memberId) => {
        try {
            await deleteMember(memberId);
            onMemberDeleted(memberId);
        } catch (error) {
            console.error('Error deleting member:', error);
            alert('Failed to delete member.')
        }
    }

    return (
        <div>
            <h2 className="text-2xl font-bold">Member List</h2>
            {members.length === 0 ? (
                <p>No members found.</p>
            ) : (
                <ul>
                    {members.map((member) => (
                        <li key={member.MemberID}>
                            <span>
                            Name: {member.LastName}, {member.FirstName} |
                            Email: {member.Email} |
                            Phone: {member.Phone} |
                            Join Date: {member.JoinDate} |
                            </span>
                            <button
                                onClick={() => onMemberUpdate(member)}
                                className="ml-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                UPDATE
                            </button>
                            <button
                                onClick={() => handleDelete(member.MemberID)}
                                className="ml-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                DELETE
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

