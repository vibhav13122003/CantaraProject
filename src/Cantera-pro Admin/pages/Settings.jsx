import React, { useState, useRef ,useEffect} from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import {
  FaBold,
  FaItalic,
  FaListUl,
  FaListOl,
  FaUnderline,
  FaPlus,
  FaTrash,
  FaEdit,
} from "react-icons/fa";

const Settings = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // FAQ Management States
  const [faqs, setFaqs] = useState([
    {
      question: "How do I register a new club in the system?",
      answer:
        "To register a new club, navigate to the Club & License Management section from the sidebar. Click on 'Add New Club' and fill in all required information including club name, country, category, and contact details. Upload the club logo and necessary documentation. Once submitted, the club will be pending approval by the admin team.",
    },
    {
      question: "What are the requirements for tournament registration?",
      answer:
        "Tournament registration requires a minimum of 4 participating clubs, a defined age category, tournament dates, venue details, and format specifications. All participating clubs must have active licenses. The tournament organizer must submit the registration at least 14 days before the start date. Additional requirements may apply for international tournaments.",
    },
  ]);
  const [newFAQ, setNewFAQ] = useState({ question: "", answer: "" });
  const [editingIndex, setEditingIndex] = useState(null);
  const [showFaqForm, setShowFaqForm] = useState(false);

  // Editor
  const editorRef = useRef(null);
  const [editorContent, setEditorContent] = useState(`<ol>
  <li><b>Acceptance of Terms</b><br/>By accessing or using Cantera Pro’s services, you agree to be bound by these Terms and Conditions.</li>
  <li><b>User Accounts</b><br/>Users are responsible for maintaining the confidentiality of their account information and password.</li>
  <li><b>Privacy Policy</b><br/>Our Privacy Policy explains how we collect, use, and protect your personal information.</li>
  <li><b>Intellectual Property</b><br/>All content, features, and functionality of the Cantera Pro platform are protected by copyright laws.</li>
</ol>`);

  // Set content once on mount
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = editorContent;
      placeCursorAtEnd();
    }
  }, []);

  const applyFormat = (command) => {
    document.execCommand(command, false, null);
  };

  const placeCursorAtEnd = () => {
    const el = editorRef.current;
    if (!el) return;
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(el);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
  };




  const handleAddFAQ = () => {
    if (newFAQ.question.trim() && newFAQ.answer.trim()) {
      const updatedFaqs = [...faqs];
      if (editingIndex !== null) {
        updatedFaqs[editingIndex] = newFAQ;
        setEditingIndex(null);
      } else {
        updatedFaqs.push(newFAQ);
      }
      setFaqs(updatedFaqs);
      setNewFAQ({ question: "", answer: "" });
      setShowFaqForm(false);
    }
  };

  const handleDeleteFAQ = (index) => {
    const updatedFaqs = [...faqs];
    updatedFaqs.splice(index, 1);
    setFaqs(updatedFaqs);
  };

  const handleEditFAQ = (index) => {
    setNewFAQ(faqs[index]);
    setEditingIndex(index);
    setShowFaqForm(true);
  };


  return (
    <div className='flex h-screen bg-gray-50 font-sans'>
      <Sidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
     <div className='flex-1 flex flex-col overflow-y-auto ml-16 sm:ml-16 md:ml-16 lg:ml-0 '>
        <Header title='Settings' route='Home / Settings' />

        <main className='p-6 space-y-10'>
          {/* Admin Profile */}
          <div className='bg-white p-6 rounded-xl shadow-sm'>
            <h3 className='text-lg font-semibold mb-4'>Admin Profile</h3>
            <div className='grid md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-sm font-medium mb-1'>Name</label>
                <input
                  className='w-full border rounded px-3 py-2'
                  value='Alexander Thompson'
                  readOnly
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  Email ID
                </label>
                <input
                  className='w-full border rounded px-3 py-2'
                  value='alexander.thompson@canterapro.com'
                  readOnly
                />
              </div>
            </div>
            <div className='flex mt-4 gap-2'>
              <button className='bg-white border border-gray-300 px-4 py-2 rounded'>
                Change Password
              </button>
              <button className='bg-purple-700 text-white px-4 py-2 rounded'>
                Update Profile
              </button>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className='bg-white p-6 rounded-xl shadow-sm'>
            <h3 className='text-lg font-semibold mb-4'>
              Terms & Conditions Management
            </h3>
            <div className='mb-4'>
              <label className='block text-sm font-medium mb-1'>
                Current T&C Version
              </label>
              <input
                type='text'
                className='w-40 border rounded px-3 py-2'
                value='v2.3'
                readOnly
              />
            </div>
            <div>
              <label className='block text-sm font-medium mb-2'>
                T&C Description / Editor
              </label>
              <div className='flex gap-2 mb-2 text-gray-600'>
                <button onClick={() => applyFormat("bold")}>
                  <FaBold />
                </button>
                <button onClick={() => applyFormat("italic")}>
                  <FaItalic />
                </button>
                <button onClick={() => applyFormat("underline")}>
                  <FaUnderline />
                </button>
                <button onClick={() => applyFormat("insertUnorderedList")}>
                  <FaListUl />
                </button>
                <button onClick={() => applyFormat("insertOrderedList")}>
                  <FaListOl />
                </button>
              </div>
              <div
                ref={editorRef}
                contentEditable
                className='w-full border rounded px-3 py-2 h-48 overflow-auto bg-white focus:outline-none'
                onInput={(e) => setEditorContent(e.currentTarget.innerHTML)}
                onFocus={placeCursorAtEnd}
              />

              <button className='mt-4 bg-purple-700 text-white px-4 py-2 rounded'>
                Save New Version
              </button>
            </div>
          </div>

          {/* FAQ Management */}
          <div className='bg-white p-6 rounded-xl shadow-sm'>
            <div className='flex justify-between items-center mb-6'>
              <h3 className='text-lg font-semibold'>FAQ Management</h3>
              <button
                className='bg-purple-700 text-white px-4 py-2 rounded flex items-center gap-2'
                onClick={() => {
                  setNewFAQ({ question: "", answer: "" });
                  setEditingIndex(null);
                  setShowFaqForm(true);
                }}
              >
                <FaPlus /> Add FAQ
              </button>
            </div>

            {showFaqForm && (
              <div className='space-y-4 mb-6'>
                <input
                  type='text'
                  placeholder='FAQ Question'
                  className='w-full border rounded px-3 py-2'
                  value={newFAQ.question}
                  onChange={(e) =>
                    setNewFAQ({ ...newFAQ, question: e.target.value })
                  }
                />
                <textarea
                  placeholder='FAQ Answer'
                  className='w-full border rounded px-3 py-2'
                  value={newFAQ.answer}
                  onChange={(e) =>
                    setNewFAQ({ ...newFAQ, answer: e.target.value })
                  }
                />
                <div className='flex gap-2'>
                  <button
                    className='bg-purple-700 text-white px-4 py-2 rounded'
                    onClick={handleAddFAQ}
                  >
                    {editingIndex !== null ? "Update FAQ" : "Save FAQ"}
                  </button>
                  <button
                    className='bg-gray-200 px-4 py-2 rounded'
                    onClick={() => {
                      setNewFAQ({ question: "", answer: "" });
                      setEditingIndex(null);
                      setShowFaqForm(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className='space-y-4'>
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className='p-4 border-l-4 border-purple-600 bg-white rounded shadow-sm'
                >
                  <div className='flex justify-between items-start'>
                    <div>
                      <h4 className='font-semibold text-gray-900'>
                        {faq.question}
                      </h4>
                      <p className='text-sm text-gray-700 mt-1'>{faq.answer}</p>
                    </div>
                    <div className='flex items-center gap-2'>
                      <button onClick={() => handleEditFAQ(index)}>
                        <FaEdit className='text-purple-600' />
                      </button>
                      <button onClick={() => handleDeleteFAQ(index)}>
                        <FaTrash className='text-red-500' />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
