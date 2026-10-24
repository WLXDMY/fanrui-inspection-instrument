/*
 * @Author:xuqiuming
 * @Date: 2022-06-10 10:30
 * @LastEditors: chenzejie
 * @LastEditTime: 2022-12-20 10:07:38
 * @Description: 视频监控
 */

import { v4 as uuidv4 } from 'uuid'

const VideoMonitorList = [
  {
    id: uuidv4(),
    address: require('@/assets/images/video/smallVideo.png'),
    name: '视频监控',
    components: 'VideoMonitor',
    width: 1920 * 0.7,
    height: 977 * 0.7,
    currentWidth: '1920',
    currentHeight: '977',
    type: 'VideoMonitor',
    zIndex: 1
  },
  {
    id: uuidv4(),
    address: require('@/assets/images/video/liveAndPlayback.png'),
    name: '直播&&回放',
    components: 'LiveAndPlayback',
    width: 1920 * 0.7,
    height: 977 * 0.7,
    currentWidth: '1920',
    currentHeight: '977',
    type: 'VideoMonitor',
    zIndex: 1
  }
]
const VideoMonitor = () => import('@/views/video-monitoring/index.vue')
const LiveAndPlayback = () => import('@/views/live-and-playback/index.vue')
const videoMonitorComs = {
  VideoMonitor,
  LiveAndPlayback
}
export { VideoMonitorList, videoMonitorComs }
