import React from "react";
import { createMember, updateMember } from "../../api/members";


// MemberForm component to add a new member
export default function MemberForm({ onMemberCreated, onMemberUpdated, updatingMember, onCancelUpdate }) {
    const [formData, setFormData] = React.useState({
        LastName: "",
        FirstName: "",
        Address: "",
        Email: "",
        Phone: "",
        BirthDate: "",
        JoinDate: "",
        MembershipStatus: "Member",
    });


    // Update form data when updatingMember prop changes
    React.useEffect(() => {
        if (updatingMember) {
            setFormData({
                LastName: updatingMember.LastName || "",
                FirstName: updatingMember.FirstName || "",
                Address: updatingMember.Address || "",
                Email: updatingMember.Email || "",
                Phone: updatingMember.Phone || "",
                BirthDate: updatingMember.BirthDate || "",
                JoinDate: updatingMember.JoinDate || "",
                MembershipStatus: updatingMember.MembershipStatus || "Member",
            });
        } else {
            setFormData({
                LastName: "",
                FirstName: "",
                Address: "",
                Email: "",
                Phone: "",
                BirthDate: "",
                JoinDate: "",
                MembershipStatus: "Member",
            });
        }
    }, [updatingMember]);


    // Object destructuring for easier access
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }


    // Handle form submission for create
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const newMember = await createMember(formData);

            // Notify parent component
            if (onMemberCreated) {
                onMemberCreated(newMember);
            }
            // Clear form fields
            setFormData({
                LastName: "",
                FirstName: "",
                Address: "",
                Email: "",
                Phone: "",
                BirthDate: "",
                JoinDate: "",
                MembershipStatus: "Member",
            });
            alert('Member created successfully!');
        } catch (error) {
            alert(`Failed to create member: ${error.message}`);
        }
    };


    // Handle form submission for update
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const updatedMember = await updateMember(updatingMember.MemberID, formData);

            // Notify parent component
            if (onMemberUpdated) {
                onMemberUpdated(updatedMember);
            }
            // Clear form fields
            setFormData({
                LastName: "",
                FirstName: "",
                Address: "",
                Email: "",
                Phone: "",
                BirthDate: "",
                JoinDate: "",
                MembershipStatus: "Member",
            });
            alert('Member updated successfully!');
        } catch (error) {
            alert(`Failed to update member: ${error.message}`);
        }
    };


    // Handle cancel update
    const handleCancelUpdate = () => {
        if (onCancelUpdate) {
            onCancelUpdate();
        }
        setFormData({
            LastName: "",
            FirstName: "",
            Address: "",
            Email: "",
            Phone: "",
            BirthDate: "",
            JoinDate: "",
            MembershipStatus: "Member",
        });
    };

    
    return (
        <div className="my-4 p-4 bg-white rounded shadow">
            <h2 className="text-2xl mb-4">
                {updatingMember ? 'Update Member' : 'Add New Member'}
            </h2>
            <form onSubmit={updatingMember ? handleUpdate : handleCreate}>
                <div className="mb-3">
                    <label className="block mb-1">
                        First Name:
                        <input
                            type="text"
                            name="FirstName"
                            value={formData.FirstName}
                            onChange={handleChange}
                            required
                            className="block w-full p-2 border rounded"
                        />
                    </label>
                </div>

                <div className="mb-3">
                    <label className="block mb-1">
                        Last Name:
                        <input
                            type="text"
                            name="LastName"
                            value={formData.LastName}
                            onChange={handleChange}
                            required
                            className="block w-full p-2 border rounded"
                        />
                    </label>
                </div>

                <div className="mb-3">
                    <label className="block mb-1">
                        Email:
                        <input
                            type="email"
                            name="Email"
                            value={formData.Email}
                            onChange={handleChange}
                            required
                            className="block w-full p-2 border rounded"
                        />
                    </label>
                </div>

                <div className="mb-3">
                    <label className="block mb-1">
                        Phone:
                        <input
                            type="tel"
                            name="Phone"
                            value={formData.Phone}
                            onChange={handleChange}
                            required
                            className="block w-full p-2 border rounded"
                        />
                    </label>
                </div>

                <div className="mb-3">
                    <label className="block mb-1">
                        Address:
                        <textarea
                            name="Address"
                            value={formData.Address}
                            onChange={handleChange}
                            required
                            rows="3"
                            className="block w-full p-2 border rounded"
                        />
                    </label>
                </div>

                <div className="mb-3">
                    <label className="block mb-1">
                        Birth Date:
                        <input
                            type="date"
                            name="BirthDate"
                            value={formData.BirthDate}
                            onChange={handleChange}
                            required
                            className="block w-full p-2 border rounded"
                        />
                    </label>
                </div>

                <div className="mb-3">
                    <label className="block mb-1">
                        Join Date:
                        <input
                            type="date"
                            name="JoinDate"
                            value={formData.JoinDate}
                            onChange={handleChange}
                            required
                            className="block w-full p-2 border rounded"
                        />
                    </label>
                </div>

                <div className="mb-3">
                    <label className="block mb-1">
                        Membership Status:
                        <select
                            name="MembershipStatus"
                            value={formData.MembershipStatus}
                            onChange={handleChange}
                            className="block w-full p-2 border rounded"
                        >
                            <option value="Member">Member</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </label>
                </div>

                <div className="flex gap-2">
                    <button 
                        type="submit"
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        {updatingMember ? 'Update Member' : 'Add Member'}
                    </button>
                </div>
                
                <div>
                    {updatingMember && (
                        <button 
                            type="button"
                            onClick={handleCancelUpdate}
                            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

