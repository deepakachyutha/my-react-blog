import React, { useState, useEffect, useRef } from 'react';
import api from '../api';

function WritePage({ currentUser, onPostCreated }) {
    const [title, setTitle] = useState('');
    const [type, setType] = useState('blog');
    const [tags, setTags] = useState('');
    const editorRef = useRef(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdn.tiny.cloud/1/mhj3gkrqpcyqfcne7fs5ep4dywmgr8579rdb4jt54q5j8k3n/tinymce/6/tinymce.min.js'; // Replace with your key
        script.referrerPolicy = 'origin';
        
        script.onload = () => {
            if (document.getElementById('post-content-editor')) {
                window.tinymce.init({
                    selector: '#post-content-editor',
                    height: 350,
                    menubar: false,
                    plugins: 'lists link',
                    toolbar: 'undo redo | bold italic | bullist numlist | fixspelling polish',
                    
                    setup: (editor) => {
                        editorRef.current = editor;

                        editor.ui.registry.addButton('fixspelling', {
                            text: 'Fix Spelling',
                            onAction: async () => {
                                const currentContent = editor.getContent({ format: 'text' });
                                if (!currentContent) return;
                                try {
                                    const result = await api.post('/api/spellcheck', { content: currentContent });
                                    editor.setContent(result.correctedText);
                                } catch (error) {
                                    alert(error.message);
                                }
                            }
                        });

                        editor.ui.registry.addButton('polish', {
                            text: 'Polish with AI',
                            onAction: async () => {
                                const currentContent = editor.getContent({ format: 'text' });
                                if (!currentContent) return;
                                try {
                                    const result = await api.post('/api/polish', { content: currentContent });
                                    editor.setContent(result.polishedText);
                                } catch (error) {
                                    alert(error.message);
                                }
                            }
                        });
                    }
                });
            }
        };
        
        document.body.appendChild(script);

        return () => {
            window.tinymce?.get(editorRef.current?.id)?.destroy();
            if (script.parentNode) {
                document.body.removeChild(script);
            }
        };
    }, []);

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        const content = editorRef.current ? editorRef.current.getContent() : '';
        if (!title || !content) {
            alert('Title and content cannot be empty.');
            return;
        }
        const newPost = {
            title, type, content,
            tags: tags.split(',').map(t => t.trim()).filter(Boolean),
            authorId: currentUser._id,
        };
        try {
            await api.post('/api/posts', newPost);
            alert('Post published successfully!');
            onPostCreated();
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="page-container">
            <div className="page-header"><h1>Create</h1></div>
            <form className="write-form" onSubmit={handlePostSubmit}>
                <div className="form-group">
                    <label className="form-label">Title</label>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="form-control form-control--lg" required />
                </div>
                <div className="form-group">
                    <label className="form-label">Type</label>
                    <select value={type} onChange={e => setType(e.target.value)} className="form-control" required>
                        <option value="blog">Blog Post</option>
                        <option value="poem">Poem</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label">Content</label>
                    <textarea id="post-content-editor"></textarea>
                </div>
                <div className="form-group">
                    <label className="form-label">Tags (comma-separated)</label>
                    <input type="text" value={tags} onChange={e => setTags(e.g.target.value)} className="form-control" />
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn btn--primary">Publish</button>
                </div>
            </form>
        </div>
    );
}

export default WritePage;