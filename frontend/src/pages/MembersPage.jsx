import React from "react";
import MemberForm from "../components/member_components/MemberForm";
import MemberList from "../components/member_components/MemberList";
import { fetchMembers } from "../api/members";

export default function MembersPage() {
    const [members, setMembers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [updatingMember, setUpdatingMember] = React.useState(null);

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

    if (loading) return <p>Loading members...</p>;
    if (error) return <p>Error:{error}</p>;

    // Handle new member creation
    const handleMemberCreated = (newMember) => {
        setMembers((prevMembers) => [...prevMembers, newMember]);
    };
    
    // Handle member update
    const handleMemberUpdated = (updatedMember) => {
        setMembers((prevMembers) =>
            prevMembers.map((member) =>
            member.MemberID === updatedMember.MemberID ? updatedMember : member
        )
        );
        setUpdatingMember(null);
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
    };

    // Handle cancel button click when updating
    const handleCancelUpdate = () => {
        setUpdatingMember(null);
    };


    return (
        <div className="bg-gray-400 p-4 m-8">
            <h1 className="text-4xl italic">Members Management</h1>
                <MemberForm
                    onMemberCreated={handleMemberCreated}
                    onMemberUpdated={handleMemberUpdated}
                    updatingMember={updatingMember}
                    onCancelUpdate={handleCancelUpdate}
                />
                <MemberList
                    members={members}
                    onMemberDeleted={handleMemberDeleted}
                    onMemberUpdate={handleMemberUpdate}
                />
        </div>
    );
}

