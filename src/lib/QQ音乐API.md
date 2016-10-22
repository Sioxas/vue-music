QQ音乐API
综合搜索:
Request URL:http://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg
is_xml:0
format:jsonp
key:薛之谦
g_tk:5381
loginUin:0
hostUin:0
inCharset:utf8
outCharset:utf-8
notice:0
platform:yqq
needNewCode:0
jsonpCallback:_jsonpcej8sdsh6ul35kohz7eu7n9udi

Response:
{
  "code": 0, 
  "data": {
    "album": {
      "count": 2, 
      "itemlist": [
        {
          "docid": "6719947451818169223", 
          "id": "443691", 
          "mid": "000QgFcm0v8WaF", 
          "name": "意外", 
          "pic": "http://imgcache.qq.com/music/photo/mid_album_58/a/F/000QgFcm0v8WaF.jpg", 
          "singer": "薛之谦"
        }, 
        {
          "docid": "9774936000049828156", 
          "id": "989994", 
          "mid": "003y8dsH2wBHlo", 
          "name": "绅士", 
          "pic": "http://imgcache.qq.com/music/photo/mid_album_58/l/o/003y8dsH2wBHlo.jpg", 
          "singer": "薛之谦"
        }
      ], 
      "name": "专辑", 
      "order": 2, 
      "type": 3
    }, 
    "mv": {
      "count": 2, 
      "itemlist": [
        {
          "docid": "14813180049852850578", 
          "id": "108782123", 
          "mid": "001nDjqk2uL2eE", 
          "name": "丑八怪 + 给我一个吻 (中国新歌声第一季 总决赛)", 
          "singer": "薛之谦/万妮达", 
          "vid": "v002153mjiu"
        }, 
        {
          "docid": "1232740628230177926", 
          "id": "108549169", 
          "mid": "000E62Tc3bMiJB", 
          "name": "你还要我怎样 (中国新歌声 第10期 中秋特辑)", 
          "singer": "薛之谦", 
          "vid": "e0021ztpog6"
        }
      ], 
      "name": "MV", 
      "order": 3, 
      "type": 4
    }, 
    "singer": {
      "count": 1, 
      "itemlist": [
        {
          "docid": "18081723860722442626", 
          "id": "5062", 
          "mid": "002J4UUk29y8BY", 
          "name": "薛之谦", 
          "pic": "http://imgcache.qq.com/music/photo/mid_singer_58/B/Y/002J4UUk29y8BY.jpg", 
          "singer": "薛之谦"
        }
      ], 
      "name": "歌手", 
      "order": 1, 
      "type": 2
    }, 
    "song": {
      "count": 4, 
      "itemlist": [
        {
          "docid": "2572028167877776756", 
          "id": "102636799", 
          "mid": "001Qu4I30eVFYb", 
          "name": "演员", 
          "singer": "薛之谦"
        }, 
        {
          "docid": "13901485118725897354", 
          "id": "5106429", 
          "mid": "000QwTVo0YHdcP", 
          "name": "丑八怪", 
          "singer": "薛之谦"
        }, 
        {
          "docid": "3393786463567784760", 
          "id": "108549169", 
          "mid": "000E62Tc3bMiJB", 
          "name": "你还要我怎样", 
          "singer": "薛之谦"
        }, 
        {
          "docid": "17948058201926277", 
          "id": "108782123", 
          "mid": "001nDjqk2uL2eE", 
          "name": "丑八怪 + 给我一个吻", 
          "singer": "薛之谦/万妮达"
        }
      ], 
      "name": "单曲", 
      "order": 0, 
      "type": 1
    }
  }, 
  "subcode": 0
}

热搜榜单：
Request URL:http://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg
g_tk:5381
jsonpCallback:hotSearchKeysmod_top_search
loginUin:0
hostUin:0
format:jsonp
inCharset:utf8
outCharset:utf-8
notice:0
platform:yqq
needNewCode:0

Response:
{
  "code": 0, 
  "data": {
    "hotkey": [
      {
        "k": "蓝瘦香菇 ", 
        "n": 429409
      }, 
      ...
    ], 
    "special_key": "黎明2016演唱会", 
    "special_url": "http://y.qq.com/m/act/cmm_shoufa_tmpl/leonlive.html"
  }, 
  "subcode": 0
}

相似歌手：
Request URL:http://c.y.qq.com/v8/fcg-bin/fcg_v8_simsinger.fcg
utf8:1
singer_mid:002J4UUk29y8BY
start:0
num:5
g_tk:5381
jsonpCallback:SingerSimCallback
loginUin:0
hostUin:0
format:jsonp
inCharset:utf8
outCharset:utf-8
notice:0
platform:yqq
needNewCode:0

Response:
{
  "singers": {
    "hasmore": 1, 
    "items": [
      {
        "id": 12111, 
        "name": "金志文", 
        "mid": "004YXxql1sSr2o", 
        "pic": "http://imgcache.qq.com/music/photo/mid_singer_150/2/o/004YXxql1sSr2o.jpg"
      },
      ...
    ]
  }
}

歌手热门MV：
Request URL:http://c.y.qq.com/mv/fcgi-bin/fcg_singer_mv.fcg
cid:205360581
singermid:002J4UUk29y8BY
order:listen
begin:0
num:5
g_tk:5381
jsonpCallback:singermvlistJsonCallback
loginUin:0
hostUin:0
format:jsonp
inCharset:utf8
outCharset:utf-8
notice:0
platform:yqq
needNewCode:0

Response:
{
  "code": 0, 
  "subcode": 0, 
  "message": "succ", 
  "data": {
    "list": [
      {
        "index": 1, 
        "vid": "o0016t2ucce", 
        "id": "370246", 
        "title": "演员", 
        "desc": "", 
        "pic": "", 
        "upload_uin": "390180732", 
        "nickname": "390180732", 
        "score": "0", 
        "listenCount": "14716582", 
        "date": "2015-06-08", 
        "singer_id": 5062, 
        "singer_name": "薛之谦", 
        "singer_mid": "002J4UUk29y8BY"
      },
      ...
    ], 
    "total": 125
  }
}

歌手热门专辑：
Request URL:http://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_album.fcg
format:jsonp
platform:yqq
singermid:002J4UUk29y8BY
order:time
begin:0
num:5
g_tk:5381
jsonpCallback:singeralbumlistJsonCallback
loginUin:0
hostUin:0
format:jsonp
inCharset:utf8
outCharset:utf-8
notice:0
platform:yqq
needNewCode:0

Response:
{
  "code": 0, 
  "data": {
    "list": [
      {
        "Fattribute_5": "0", 
        "Ftype": "1", 
        "albumID": "1621781", 
        "albumMID": "0010AiE938slaM", 
        "albumName": "新专辑《初学者》上海歌迷见面会", 
        "albumtype": "", 
        "company": "暂无", 
        "desc": "", 
        "lan": "", 
        "listen_count": "163019", 
        "pubTime": "2016-09-23", 
        "score": "929", 
        "shoufa": 1, 
        "singerID": "5062", 
        "singerMID": "002J4UUk29y8BY", 
        "singerName": "薛之谦", 
        "singers": [
          {
            "singer_id": "5062", 
            "singer_mid": "002J4UUk29y8BY", 
            "singer_name": "薛之谦"
          }
        ], 
        "type": 0
      }, 
      ...
    ], 
    "singer_id": 5062, 
    "singer_mid": "002J4UUk29y8BY", 
    "singer_name": "薛之谦", 
    "total": 14
  }, 
  "message": "succ", 
  "subcode": 0
}

歌手热门歌曲：
Request URL:http://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg
g_tk:5381
jsonpCallback:MusicJsonCallbacksinger_track
loginUin:0
hostUin:0
format:jsonp
inCharset:utf8
outCharset:utf-8
notice:0
platform:yqq
needNewCode:0
singermid:002J4UUk29y8BY
order:listen
begin:0
num:30
songstatus:1

Response:
{
  "code": 0, 
  "data": {
    "list": [
      {
        "Flisten_count1": "866698506", 
        "Fupload_time": "2016-10-07 20:07:02", 
        "index": 1, 
        "isnew": 1, 
        "listenCount": 0, 
        "musicData": {
          "albumdesc": "加油曲", 
          "albumid": 1634630, 
          "albummid": "003zeWC84IaQCM", 
          "albumname": "中国新歌声第一季 总决赛", 
          "alertid": 11, 
          "belongCD": 1, 
          "cdIdx": 0, 
          "interval": 286, 
          "isonly": 1, 
          "label": "13835058055286358081", 
          "msgid": 0, 
          "pay": {
            "payalbum": 0, 
            "payalbumprice": 0, 
            "paydownload": 0, 
            "payinfo": 0, 
            "payplay": 0, 
            "paytrackmouth": 0, 
            "paytrackprice": 0, 
            "timefree": 0
          }, 
          "preview": {
            "trybegin": 0, 
            "tryend": 0, 
            "trysize": 0
          }, 
          "rate": 1, 
          "singer": [
            {
              "id": 5062, 
              "mid": "002J4UUk29y8BY", 
              "name": "薛之谦"
            }, 
            {
              "id": 1119968, 
              "mid": "003cHsJw40aXQ3", 
              "name": "万妮达"
            }
          ], 
          "size128": 4583568, 
          "size320": 0, 
          "size5_1": 0, 
          "sizeape": 0, 
          "sizeflac": 0, 
          "sizeogg": 0, 
          "songid": 108782123, 
          "songmid": "001nDjqk2uL2eE", 
          "songname": "丑八怪 + 给我一个吻 (Live) (加油曲)", 
          "songorig": "丑八怪 + 给我一个吻", 
          "songtype": 0, 
          "strMediaMid": "000E9iEr1LXiDl", 
          "stream": 10, 
          "switch": 603923, 
          "type": 0, 
          "vid": "v002153mjiu"
        }, 
        "playurl": "", 
        "price": 320, 
        "vid": {
          "Fmv_id": "1046633", 
          "Fstatus": "1", 
          "Fvid": "v002153mjiu"
        }
      }, 
      ...
    ], 
    "singer_id": "5062", 
    "singer_mid": "002J4UUk29y8BY", 
    "singer_name": "薛之谦", 
    "total": 89
  }, 
  "message": "succ", 
  "subcode": 0
}

歌词接口:
Request URL:http://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg
nobase64:1
musicid:5748409
songtype:0
callback:jsonp1

Response:
{"retcode":0,"code":0,"subcode":0,"type":1,"songt":0,"lyric":"..."})

歌词需要转义：http://www.cnblogs.com/owys/p/4589579.html


歌曲榜单:
Request URL:http://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg
format:jsonp
g_tk:5381
uin:0
format:jsonp
inCharset:utf-8
outCharset:utf-8
notice:0
platform:h5
needNewCode:1
_:1476804577179
jsonpCallback:jsonp2

Response:
{
  "code": 0, 
  "subcode": 0, 
  "message": "", 
  "default": 0, 
  "data": {
    "topList": [
      {
        "id": 4, 
        "listenCount": 19200000, 
        "picUrl": "http://y.gtimg.cn/music/common/upload/iphone_order_channel/toplist_4_300_108836628.jpg", 
        "songList": [
          {
            "singername": "Maroon 5/Kendrick Lamar", 
            "songname": "Don't Wanna Know"
          }, 
          {
            "singername": "薛之谦", 
            "songname": "演员"
          }, 
          {
            "singername": "薛之谦", 
            "songname": "丑八怪"
          }
        ], 
        "topTitle": "斯柯达汽车·巅峰榜·流行指数", 
        "type": 0
      }, 
      ...
    ]
  }
}

榜单歌曲列表:
Request URL:http://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg
g_tk:5381
uin:0
format:json
inCharset:utf-8
outCharset:utf-8
notice:0
platform:h5
needNewCode:1
tpl:3
page:detail
type:top
topid:26
_:1476804780119
jsonpCallback:toplistDataCallback

返回数据太多了.....

歌手页面：
Request URL:http://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg
order:listen
begin:0
num:8
singermid:000qrPik2w6lDr
g_tk:5381
uin:0
format:jsonp
inCharset:utf-8
outCharset:utf-8
notice:0
platform:h5page
needNewCode:1
from:h5
_:1477034287497
jsonpCallback:ssonglist1477034287490

Response:
{
  "code": 0, 
  "data": {
    "SingerDesc": "泰勒•斯威夫特（Taylor Swift），美国乡村音乐著名创作女歌手。1989年出生于美国宾州。2006年与独立唱片公司Big Machine签约并发行首张个人专辑《Taylor Swift》。第二张专辑《Fearless》在2008年11月11日发行，在Billboard排行榜上到达了第一的位置，首支单曲《Love Story》在2008年9月正式发行，成为了第二畅销的乡村单曲，在公告牌最热100中最高排到第四。该专辑也卖出了乡村音乐最高的销售量约60万张，包括其他种类的音乐，也是美国女歌手公开销售最多的专辑。Taylor曾获得美国乡村音乐协会奖年度最佳专辑奖、格莱美年度专辑奖等荣誉。第四张专辑《Red》于2012年10月22日发行。2013年11月获颁第47届乡村音乐协会奖“最高荣誉”巅峰奖 。2014年10月27日发行第五张专辑《1989》 ，发行首周售出128万余张，成为美国唱片市场近十二年最高的首周销量纪录，泰勒也凭这张专辑成为唯一一位拥有三张首周百万销量的歌手；同年11月获颁第42届全美音乐奖“最高荣誉”成就奖；12月9日，入选美国《时代》周刊“2014年度人物”的最终候选人 。", 
    "albumlist": [
      {
        "albummid": "003w3sNC2aEVHH", 
        "id": 1182277, 
        "name": "Wildest Dreams (R3hab Remix) (狂野的梦想（R3hab混音版）)", 
        "pic": "http://y.gtimg.cn/music/photo_new/T002R150x150M000003w3sNC2aEVHH.jpg", 
        "publish_date": "2015-10-15", 
        "strAlbumTran": "狂野的梦想（R3hab混音版）", 
        "url": "http://y.qq.com/v3/static/album/77/album_1182277_0.json.z"
      }, 
      {
        "albummid": "001kflaq1ZqR9D", 
        "id": 1101466, 
        "name": "Wildest Dreams (狂野之梦)", 
        "pic": "http://y.gtimg.cn/music/photo_new/T002R150x150M000001kflaq1ZqR9D.jpg", 
        "publish_date": "2015-08-25", 
        "strAlbumTran": "狂野之梦", 
        "url": "http://y.qq.com/v3/static/album/66/album_1101466_0.json.z"
      }, 
      {
        "albummid": "001uugxk3TxVc3", 
        "id": 989466, 
        "name": "Bad Blood (敌对)", 
        "pic": "http://y.gtimg.cn/music/photo_new/T002R150x150M000001uugxk3TxVc3.jpg", 
        "publish_date": "2015-05-17", 
        "strAlbumTran": "敌对", 
        "url": "http://y.qq.com/v3/static/album/66/album_989466_0.json.z"
      }
    ], 
    "color": 2105408, 
    "fans": 3798332, 
    "list": [
      {
        "Flisten_count1": "46660320", 
        "Fupload_time": "2010-10-25 17:59:06", 
        "index": 1, 
        "isnew": 0, 
        "listenCount": 0, 
        "musicData": {
          "albumdesc": "", 
          "albumid": 60294, 
          "albummid": "001QmRCD2PGa4o", 
          "albumname": "Speak Now", 
          "alertid": 100002, 
          "belongCD": 14, 
          "cdIdx": 0, 
          "interval": 317, 
          "isonly": 0, 
          "label": "13835058055290560592", 
          "msgid": 13, 
          "pay": {
            "payalbum": 0, 
            "payalbumprice": 0, 
            "paydownload": 1, 
            "payinfo": 1, 
            "payplay": 1, 
            "paytrackmouth": 1, 
            "paytrackprice": 200, 
            "timefree": 0
          }, 
          "preview": {
            "trybegin": 74926, 
            "tryend": 95396, 
            "trysize": 336874
          }, 
          "rate": 31, 
          "singer": [
            {
              "id": 11921, 
              "mid": "000qrPik2w6lDr", 
              "name": "Taylor Swift"
            }
          ], 
          "size128": 5092040, 
          "size320": 12720765, 
          "size5_1": 0, 
          "sizeape": 38264511, 
          "sizeflac": 39293610, 
          "sizeogg": 7093554, 
          "songid": 732381, 
          "songmid": "0016hWfr285oV5", 
          "songname": "Long Live", 
          "songorig": "Long Live", 
          "songtype": 0, 
          "strMediaMid": "0016hWfr285oV5", 
          "stream": 8, 
          "switch": 628481, 
          "type": 0, 
          "vid": "y0016a0wnws"
        }, 
        "playurl": "", 
        "price": 320, 
        "vid": {
          "Fmv_id": "85563", 
          "Fstatus": "1", 
          "Fvid": "y0016a0wnws"
        }
      }, 
      ...
    ], 
    "singer_id": "11921", 
    "singer_mid": "000qrPik2w6lDr", 
    "singer_name": "Taylor Swift", 
    "total": 242
  }, 
  "message": "succ", 
  "subcode": 0
}