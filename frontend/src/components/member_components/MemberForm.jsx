import React from "react";
import { createMember, updateMember } from "../../api/members";

/**
 * MemberForm component for creating or updating a member.
 * MembershipStatus can be either "Member" or "Admin".
 */
export default function MemberForm({ onMemberCreated, onMemberUpdated, updatingMember, onCancelUpdate }) {
    // Form state
    const [formData, setFormData] = React.useState({
        LastName: "",
        FirstName: "",
        Address: "",
        Email: "",
        Phone: "",
        BirthDate: "",
        JoinDate: "",
        MembershipStatus: "Member", // Default to "Member"
    });

    const [error, setError] = React.useState(null);

    // Populate form when updatingMember changes
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
            resetForm();
        }
    }, [updatingMember]);

    // Reset form helper
    const resetForm = () => {
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
        setError(null);
    };

    // Generic change handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Email validation helper
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Phone validation helper (basic: digits, spaces, dashes, parentheses)
    const validatePhone = (phone) => {
        const phoneRegex = /^[\d\s\-()]+$/;
        return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
    };

    // Create a new member
    const handleCreate = async (e) => {
        e.preventDefault();
        setError(null);

        // Frontend validation
        if (!validateEmail(formData.Email)) {
            setError("Please enter a valid email address");
            return;
        }

        if (!validatePhone(formData.Phone)) {
            setError("Please enter a valid phone number (at least 10 digits)");
            return;
        }

        try {
            const newMember = await createMember(formData);
            if (onMemberCreated) onMemberCreated(newMember);
            resetForm();
            alert("Member created successfully!");
        } catch (error) {
            setError(`Failed to create member: ${error.message}`);
        }
    };

    // Update an existing member
    const handleUpdate = async (e) => {
        e.preventDefault();
        setError(null);

        // Frontend validation
        if (!validateEmail(formData.Email)) {
            setError("Please enter a valid email address");
            return;
        }

        if (!validatePhone(formData.Phone)) {
            setError("Please enter a valid phone number (at least 10 digits)");
            return;
        }

        try {
            const updatedMember = await updateMember(updatingMember.MemberID, formData);
            if (onMemberUpdated) onMemberUpdated(updatedMember);
            resetForm();
            alert("Member updated successfully!");
        } catch (error) {
            setError(`Failed to update member: ${error.message}`);
        }
    };

    // Cancel update
    const handleCancelUpdate = () => {
        if (onCancelUpdate) onCancelUpdate();
        resetForm();
    };

    return (
        <div className="my-4 p-4 bg-white rounded shadow">
            <h2 className="text-2xl mb-4">
                {updatingMember ? "Update Member" : "Add New Member"}
            </h2>
            
            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded border border-red-300">
                    {error}
                </div>
            )}

            <form onSubmit={updatingMember ? handleUpdate : handleCreate}>
                {/* First Name */}
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

                {/* Last Name */}
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

                {/* Email */}
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
                            placeholder="email@buecheria.de"
                        />
                    </label>
                </div>

                {/* Phone */}
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
                            placeholder="01234567890"
                        />
                    </label>
                </div>

                {/* Address */}
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
                            placeholder="Vogelhüttendeich 30, HH-Wilhelmsburg"
                        />
                    </label>
                </div>

                {/* Birth Date */}
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

                {/* Join Date */}
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

                {/* Membership Status - Radio Buttons */}
                <div className="mb-3">
                    <label className="block mb-2 font-semibold">
                        Membership Status:
                    </label>
                    <div className="flex gap-4">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                name="MembershipStatus"
                                value="Member"
                                checked={formData.MembershipStatus === "Member"}
                                onChange={handleChange}
                                className="w-4 h-4 mr-2 cursor-pointer"
                            />
                            <span>Member</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                name="MembershipStatus"
                                value="Admin"
                                checked={formData.MembershipStatus === "Admin"}
                                onChange={handleChange}
                                className="w-4 h-4 mr-2 cursor-pointer"
                            />
                            <span>Admin</span>
                        </label>
                    </div>
                </div>

                {/* Submit / Cancel */}
                <div className="flex gap-2">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        {updatingMember ? "Update Member" : "Add Member"}
                    </button>
                    {updatingMember && (
                        <button
                            type="button"
                            onClick={handleCancelUpdate}
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

