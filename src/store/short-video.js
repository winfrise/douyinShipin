import { defineStore } from "pinia";
import { scanDir, getFileTree } from '@/api/short-video'

// import { useVideoStore } from './videos'
// const videoStore = useVideoStore()
const getFileExt = (filePath) => {
  return filePath.match(/[^.]+$/g)[0];
}

const getFolder = (filePath) => {
  const index = filePath.lastIndexOf('/')
  return filePath.substring(0, index)
}

const getFileName = (filePath) => {
  const index = filePath.lastIndexOf('/')
  return filePath.substring(index)
}

const getFileType = (fileExt) => {
  const imgExts = ['jpg', 'gif', 'jpg', 'jpeg']
  const videoExts = ['mp4', 'mov', 'avi', 'mkv', 'flv', '3gp']

  if (imgExts.includes(fileExt)) {
    return 'img'
  }

  if (videoExts.includes(fileExt)) {
    return 'video'
  }
  return 'other'  
}

const flatFolder = (folder) => {
  debugger
  const result = []
  if (folder.file_list) {
    folder.file_list.forEach(filePath => {
      console.log('filePath', filePath)
      const fileExt = getFileExt(filePath)
      const folder = getFolder(filePath)
      const type =  getFileType(fileExt)
      const fileName = getFileName(filePath)
      const item = {
        user: folder,
        type,
        fileExt,
        fileName,
        videoUrl: '',
        imgUrl: '',
        fileUrl: '',
        likeFlag: false,
        collectionFlag: false,
        text: "在亚特兰蒂斯，水将带走眼泪,只有鲜血才能让众神听到呼声! #DC #温子仁 #海王",
        name: "爱好剧",
        time: "2023-05-10",
        likeTotal: 66,
        collTotal: 66,
        chat: [],
      }
      if (type === 'img') {
        item.imgUrl = filePath
      } else if (type === 'video') {
        item.videoUrl = filePath
      } else {
        item.fileUrl = filePath
      }
      result.push(item)
    })
  }
  if (folder.folder_list) {
    const folderFileList = folder.folder_data.map(flatFolder).flat(1)
    result.push(...folderFileList)
  }
  return result
}

export const useShortVideoStore = defineStore('douyin', {
  state() {
    return {
      navList: [{label: '文件列表', name: 'fileList'}, {label: '随机列表', name: 'randomList'}],
      navName: 'fileList',
      resData: {},
      fileList: [],
      fileIndex: 0,
      fileTree: []
    };
  },
  getters: {

  },
  actions: {
    async scanDir(params = {path: './'}) {
        const [err, res] = await scanDir(params)
        if (err) return
        this.fileList = flatFolder(res.data || {})
        
        // videoStore.dramaData.videos = this.fileList
    },
    async getFileTree(params = {path: '.'}) {
      const [err, res] = await getFileTree(params)
      if (err) return
      this.fileTree = res?.data?.file_tree ?? []
    }
  },
  persist: {
    storage: localStorage,
  },
});
