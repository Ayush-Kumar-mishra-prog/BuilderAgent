import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useEffect, useState } from "react";
import toast, { LoaderIcon } from "react-hot-toast";
import Loading from "../components/Loading";
import BuilderHeader from "../components/BuilderHeader";
import { FolderTreeIcon, MessageSquare } from "lucide-react";
import ChatPannel from "../components/ChatPannel";
import FileExplorer from "../components/FileExplorer";
import PreviewPannel from "../components/PreviewPannel";
import AgentProgressDashboard from "../components/AgentProgressDashboard";
import PublishModel from "../components/PublishModel";
import api from "../api/api";
import { exportProjectZip } from "../utils/exportProject";

const Builder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [leftTab, setLeftTab] = useState("chat");
  const [publishing, setPublishing] = useState(false);
  const [publishUrl, setPublishUrl] = useState(null);
  const {
    loadingActiveProject,
    activeProject,
    activeFile,
    showCode,
    setActiveFile,
    setShowCode,
    loadProject,
    logout,
    chatLoading,
    handleChat,
  } = useAppContext();

  useEffect(() => {
    if (!id) return;
    loadProject(id);
  }, [id]);
 
  if (loadingActiveProject || !activeProject) {
    return <Loading />;
  }

  const handleOpenPreview = () => {
    if (!id) return;

    window.open(`/preview/${id}`, "_blank");
  };
  const handlePublish = async () => {
    if (!id) return;
    setPublishing(true);
    try {
      await api.post(`/api/projects/${id}/publish`);
      const url = `${window.location.origin}/publish/${id}`;

      setPublishUrl(url);
      toast.success("Website published successfully");
    } catch (error) {
      console.error(error);
      toast.error("Filed to publish");
    } finally {
      setPublishing(false);
    }
  };
  const handleDownload = async () => {
    if (!activeProject) return;
    exportProjectZip(activeProject);
  };
  return (
    <>
      <div className="h-screen flex flex-col bg-white overflow-hidden text-zinc-800 relative">
        <BuilderHeader
          projectName={activeProject.name}
          version={activeProject.version}
          showCode={showCode}
          publishing={publishing}
          onToggleShowCode={() => setShowCode(!showCode)}
          onOpenPreview={handleOpenPreview}
          onPublish={handlePublish}
          onDownload={handleDownload}
          onBack={() => navigate("/")}
          onLogout={logout}
        />

        <div className="flex-1 flex overflow-hidden">
          <div className="w-[320px] shrink-0 flex flex-col border-r border-zinc-200 bg-white">
            <div className="flex border-b border-zinc-100">
              <button
                onClick={() => setLeftTab("chat")}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium cursor-pointer ${leftTab === "chat" ? "text-zinc-900 border-b-2 border-zinc-900" : "text-zinc-400 hover:text-zinc-700"}`}
              >
                <MessageSquare size={13} /> Chat
              </button>

              <button
                onClick={() => setLeftTab("files")}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium cursor-pointer ${leftTab === "files" ? "text-zinc-900 border-b-2 border-zinc-900" : "text-zinc-400 hover:text-zinc-700"}`}
              >
                <FolderTreeIcon size={13} /> Files
              </button>
            </div>

            <div className="flex-1 overflow-hidden">
              {leftTab === "chat" ? (
                <ChatPannel
                  messages={activeProject.messages}
                  onSend={handleChat}
                  loading={chatLoading}
                />
              ) : (
                <FileExplorer
                  activeFile={activeFile}
                  files={activeProject.files}
                  onFileSelect={(path) => {
                    setActiveFile(path);
                    setShowCode(true);
                  }}
                />
              )}
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            {activeProject.status === "pending" ||
            activeProject.status === "generating" ||
            activeProject.status === "failed" ? (
              <AgentProgressDashboard project={activeProject} />
            ) : (
              <PreviewPannel
                activeFile={activeFile}
                project={activeProject}
                showCode={showCode}
              />
            )}
          </div>
        </div>

        {publishUrl && (
          <PublishModel
            onClose={() => setPublishUrl(null)}
            publishUrl={publishUrl}
          />
        )}
      </div>
    </>
  );
};

export default Builder;
