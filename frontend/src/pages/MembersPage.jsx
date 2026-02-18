import React from "react";
import { Plus, X } from "lucide-react";
import MemberForm from "../components/member_components/MemberForm";
import MemberList from "../components/member_components/MemberList";
import { fetchMembers } from "../api/members";

export default function MembersPage() {
    const [members, setMembers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [updatingMember, setUpdatingMember] = React.useState(null);
    const [showForm, setShowForm] = React.useState(false);

    // Fetch members on component mount
    React.useEffect(() => {
        async function loadMembers() {
            try {
                const data = await fetchMembers();
                setMembers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        loadMembers();
    }, []);

    // Handle new member creation
    const handleMemberCreated = (newMember) => {
        setMembers((prevMembers) => [...prevMembers, newMember]);
        setShowForm(false);
    };
    
    // Handle member update
    const handleMemberUpdated = (updatedMember) => {
        setMembers((prevMembers) =>
            prevMembers.map((member) =>
            member.MemberID === updatedMember.MemberID ? updatedMember : member
        )
        );
        setUpdatingMember(null);
        setShowForm(false);
    };

    // Handle member deletion
    const handleMemberDeleted = (memberId) => {
        setMembers((prevMembers) =>
            prevMembers.filter((member) => member.MemberID !== memberId)
        );
    };

    // Handle update button click
    const handleMemberUpdate = (member) => {
        setUpdatingMember(member);
        setShowForm(true);
    };

    // Handle cancel button click when updating
    const handleCancelUpdate = () => {
        setUpdatingMember(null);
        setShowForm(false);
    };


    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-300 mb-2">Members</h1>
                    <p className="text-gray-600 dark:text-slate-400">Manage library members</p>
                </div>
                <button
                    onClick={() => {
                        setUpdatingMember(null);
                        setShowForm(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                    <Plus className="w-5 h-5" />
                    Add Member
                </button>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="bg-white dark:!bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-8 text-center">
                    <p className="text-gray-600 dark:text-slate-400">Loading members...</p>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <p className="text-red-700 dark:text-red-300">Error: {error}</p>
                </div>
            )}

            {/* Content */}
            {!loading && !error && (
                <>
                    {/* Form Section */}
                    {showForm && (
                        <div className="bg-white dark:!bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm p-6 mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-300">
                                    {updatingMember ? 'Update Member' : 'Add New Member'}
                                </h2>
                                <button
                                    onClick={handleCancelUpdate}
                                    className="text-gray-400 dark:text-slate-400 hover:text-gray-600 dark:hover:text-slate-200 transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <MemberForm
                                onMemberCreated={handleMemberCreated}
                                onMemberUpdated={handleMemberUpdated}
                                updatingMember={updatingMember}
                                onCancelUpdate={handleCancelUpdate}
                            />
                        </div>
                    )}

                    {/* List Section */}
                    <MemberList
                        members={members}
                        onMemberDeleted={handleMemberDeleted}
                        onMemberUpdate={handleMemberUpdate}
                    />
                </>
            )}
        </div>
    );
}

