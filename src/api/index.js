import Axios from './axios';
// import global from './../utils/global';

// ====================XXXX====================
export const GetList = data => Axios.get('url', data);

// ====================XX====================
export const GetList1 = data => Axios.post('url', data);

// ====================账号登陆====================
export const Login = data => Axios.post('/index/login', data);
export const Register = data => Axios.post('/index/register', data);
export const sendRegisterSms = data => Axios.post('/index/sendregistersms', data);
export const sendResetPasswordSms = data => Axios.post('/index/sendresetpasswordsms', data);
export const resetPwd = data => Axios.post('/index/resetpwd', data);
// ================忘记密码，验证发送的短信是否正确======================
export const verifycode = data => Axios.post('/index/verifycode', data);
// ================修改手机号，验证发送的短信是否正确======================
export const verifycode2 = data => Axios.post('/user/verifyCode', data);
export const sendTradPasswordSms = data => Axios.post('/message/sendTradePasswordSms', data);
export const sendNewMobileSms = data => Axios.post('/message/sendupdatemobilesms', data);
export const changeBindMobile = data => Axios.post('/user/updatemobile', data);
// ====================获取我的推荐列表====================
export const getInviteList = data => Axios.get('/user/getinviteuser', { params: data });

// ====================获取账户资产列表====================
export const getBalanceList = () => Axios.get('/userwallet/getwalletlist');

// ====================邮箱注册====================
export const emailRegister = data => Axios.post('/email/register', data);
// ====================邮箱注册/登录====================
export const emailRegister2 = data => Axios.post('/email/smslogin', data);
// ====================邮箱注册之前需要的发送验证码====================
export const emailRegisterSendCode = data => Axios.post('/email/sendregistercode', data);
// ====================邮箱登录====================
export const emailLogin = data => Axios.post('/email/login', data);
// ====================邮箱修改密码之前的发送验证码====================
export const emailSendresetpasswordsms = data => Axios.post('/email/sendresetpasswordsms', data);
// ====================邮箱修改密码====================
export const emailResetpassword = data => Axios.post('/email/resetpwd', data);
// ====================邮箱修改密码 验证 验证码是否ok====================
export const emailVerifycode = data => Axios.post('/email/verifycode', data);
// ====================更换绑定邮箱====================
export const upDateEmail = data => Axios.post('/useremail/updateemail', data);
// ====================更换绑定邮箱，给新邮箱发送验证码====================
export const upDateEmailSend = data => Axios.post('/useremail/sendupdateemailsms', data);

// ====================获取币种和对应的兑换列表====================
export const getAssetList = () => Axios.get('/exchange/getassetslist');
export const addCoinAccount = data => Axios.post('/api/asset/addcoinaccount', data);
export const smsLogin = data => Axios.post('/index/smslogon', data);
export const sendLoginSms = data => Axios.post('/index/sendloginsms', data);

// 折跃资产
export const jumpSave = data => Axios.post('/jump/jumpsave', data);
// 拾取折跃数量
export const collectJump = data => Axios.get('/jump/collectjump', { params: data });
// ========获取折跃倍数=====
export const getjumpprofit = data => Axios.get('jump/getjumpprofit', { params: data });
// 获取可拾取折跃数量
export const getJumpNumber = data => Axios.get('/jump/getjumpnumber', { params: data });
// ========银河币提现============
export const assetDraw = data => Axios.get('/userwallet/usdttransferaccounts', { params: data });
// ==========游戏列表=================
export const gameList = data => Axios.get('/game/getgamelist', { params: data });
// ==========总资产统计=================
export const totalAsset = data => Axios.get('/jump/getjumpgalaxy', { params: data });
// ==========获取折跃后的数量=================
export const jumpAmount = data => Axios.get('/jump/getjumpratio', { params: data });

// ====================创建钱包====================
export const createWallet = data => Axios.post('/wallet/createwallet', data);

// ====================创建USDT币种====================
export const createUSDT = data => Axios.post('/usdtwallet/createusdt', data);

// ====================创建WGC币种====================
export async function createWGC(data) {
  const res = await getAssetList();
  const { list } = res.data;
  const { addr } = data.asset_list[0];
  console.log('data', list, addr);
  const contAddr = list.filter(val => (val.name === 'WGC' || val.code === 'WGC'))[0].contract_addr;
  const params = {
    asset: 'WGC',
    addr,
    contract_addr: contAddr,
  };
  console.log('params', JSON.parse(JSON.stringify(params)));
  return Axios.post('/asset/addcoinaccount', params);
}

// ====================创建钱包最后一步====================
export async function createFinal(data) {
  const wallet = await createWallet(data);
  const WGC = await createWGC(wallet.data);
  const params = {
    auxiliary_word: wallet.data.auxiliary_word,
    device_id: localStorage.uuid,
  };
  const USDT = await createUSDT(params);
  const hasUSDT = wallet.data.asset_list.filter(item => item.asset === 'USDT');
  if(hasUSDT.length > 0) {

  }
  wallet.data.asset_list.push(WGC.data, USDT.data);
  return wallet;
}
// ========助记词导入钱包============
export const importWordWalletFuc = data => Axios.post('/wallet/importwallet', data);
// =========最后一步导入============
export async function importFinal(data) {
  const wallet = await importWordWalletFuc(data);
  const WGC = await createWGC(wallet.data);
  const params = {
    auxiliary_word: wallet.data.auxiliary_word,
    device_id: localStorage.uuid,
  };
  const hasUSDT = wallet.data.asset_list.filter(item => item.asset === 'USDT');
  wallet.data.asset_list.push(WGC.data);
  if (hasUSDT.length === 0) {
    const USDT = await createUSDT(params);
    wallet.data.asset_list.push(USDT.data);
  }
  return wallet;
}


// ========备份钱包============
export const backupWalletFuc = data => Axios.post('/wallet/backupswallet', data);
// ========修改钱包名称============
export const updateWalletName = data => Axios.post('/wallet/updatewalletname', data);
// ========修改钱包名称============
export const verifyPassword = data => Axios.post('/wallet/verifypassword', data);

// ========私钥导入钱包============
export const importKeyWalletFuc = data => Axios.post('/wallet/importkey', data);
export const exportKey = data => Axios.post('/asset/exportprivatekey', data);

// ========获取币种资产详情============
export const getAssetDetail = data => Axios.get('/asset/getassetdetails', { params: data });

// ========获取币种资产交易记录列表============
export const getAssetTranList = data => Axios.get('/asset/getassetloglist', { params: data });

// ========获取币种资产交易记录详情============
export const getAssetTranDetail = data => Axios.get('/asset/gettradingdetails',{ params: data });

// ========我的推广列表============
export const promationList = data => Axios.post('/user/getspreadcount', data);

// ========地址簿列表============
export const addrList = data => Axios.post('/addrbooks/getaddrlist', data);

// ========获取地址簿详情============
export const getAddrInfo = data => Axios.post('/addrbooks/getaddrinfo', data);

// ========添加地址簿============
export const createAddr = data => Axios.post('/addrbooks/addaddr', data);

// ========编辑地址簿============
export const editAddr = data => Axios.post('/addrbooks/updateaddr', data);

// ========删除地址簿============
export const deletAddr = data => Axios.post('/addrbooks/deladdr', data);

// ========修改用户名============
export const changeUsername = data => Axios.post('/user/updateusername', data);

// =======获取用户信息============
export const getUserinfo = data => Axios.get('/user/getuserinfo', { params: data });

// =======获取用户币种资产详情============
export const getUserAssetinfo = data => Axios.get('/userwallet/getassetinfo', { params: data });

// =======获取用户币种资产交易(列表)============
export const getUserAssetList = data => Axios.get('/userwallet/getassetloglist', { params: data });

// =======获取用户币种资产交易(详情)============
export const getUserAssetDetail = data => Axios.get('/userwallet/getassetloginfo', { params: data });

// =======获取用户币种资产收款二维码============
export const getUserAssetQR = data => Axios.get('/userwallet/getreceivablesinfo', { params: data });

// ========修改登陆密码============
export const changeLgpw = data => Axios.post('/index/resetpwd', data);

// ========修改交易密码============
export const changeTranpw = data => Axios.post('/user/setingtradepassword', data);

// ========邀请分享数据============
export const getShare = data => Axios.post('/user/getuserinvite', data);

// ========关于我们============
export const getAbout = data => Axios.post('/exchange/getcompanyappinfo', data);

// ========上传图片============
export const uploadImage = data => Axios.post('/upload/uploadImage', data);

// ========上传用户头像============
export const uploadAvatar = data => Axios.post('/user/updateavatar', data);

// ========wgc兑换USDT的比例============
export const getWGCRadio = data => Axios.get('/userwallet/getratio', { params: data });

// ========wgc兑换USDT============
export const exchangeWGC = data => Axios.post('/userwallet/wgctousdt', data);

// ========多链钱包转账(参数加user_id就是转给用户了)============
export const walletTransfer = data => Axios.post('/asset/transferaccounts', data);
// ========多链USDT钱包转账(参数加user_id就是转给用户了)============
export const usdtTransfer = data => Axios.post('/usdtwallet/transferaccounts', data);

// ========WGC钱包转账(用户转非用户)============
export const userTransfer = data => Axios.post('/userwallet/transferaccounts', data);

// ========WGC钱包转账(用户转用户)============
export const userTransfer2 = data => Axios.post('/userwallet/transferuseraccounts', data);

// ========根据地址获取用户id============
export const getUserId = data => Axios.get('/userwallet/getaddruser', { params: data });

// ========获取新闻list============
export const getNewsList = data => Axios.get('/news/list', { params: data });
// ========获取新闻详情============
export const getNewsDetail = data => Axios.get('/news/get', { params: data });
// ========获取投资banner============
export const getNewsBanner = data => Axios.get('/news/ad', { params: data });
// ========获取用户锁仓信息==========
export const getUserLock = data => Axios.get('/lock/getuserlock', { params: data });
// ========获取用户锁仓配置信息==========
export const getLockData = data => Axios.get('/lock/getlockdata', { params: data });
// ========买入锁仓==========
export const buyLock = data => Axios.post('/lock/buylock', data);
// ========锁仓列表==========
export const lockList = data => Axios.get('/lock/getlocklist', { params: data });
// ========锁仓详情==========
export const lockDetail = data => Axios.get('/lock/getlockinfo', { params: data });
// ========锁仓交易列表==========
export const lockLogList = data => Axios.get('/lock/getloglist', { params: data });
// ========搜索币种列表-添加币种============
export const getSearchList = data => Axios.get('/asset/getcontractbykeyword', { params: data });
// ========版本更新=====
export const getVersion = data => Axios.get('/exchange/getappversion', { params: data });
// ========会员信息=====
export const getVip = data => Axios.get('/user/getmembercount', { params: data });
// ========获取游戏资产=====
export const getGameAsset = data => Axios.get('/userwallet/getgamelist', { params: data });
// 查询usdt余额
export const getUSDTBalance = data => Axios.get('/usdtwallet/getbalance', { params: data });
// ========获取拾取机器人商品列表=====
export const getcollectrobotlist = data => Axios.post('/collectrobot/getcollectrobotlist', data);
// ========购买机器人=====
export const buycollectrobot = data => Axios.post('/collectrobot/buycollectrobot', data);
// ========获取用户智能机器人到期时间=====
export const getRobotExpireTime = data => Axios.get('/collectrobot/getusercollectrobot', { params: data });
// ========获取兑币产品列表=====
export const getgameconvertlist = data => Axios.get('/game/getgameconvertlist', { params: data });
// ========购买兑币产品=====
export const buygameconvert = data => Axios.post('/game/buygameconvert', data);
// ========获取的行情列表=====
export const getQuotationList = data => Axios.get('exchange/getcttticker', { params: data });
// ========转账=====
export const transferAccounts = data => Axios.post('/transfer/transfer', data);

// +++++++++++++++++++++++去中心化 ++++++++++++++++++++++++++++

// =========快速创建=================
export const quickCreation = data => Axios.post('/removecenterwallet/Remove_center_wallet/createWallet', data);
// =========助记词导入=================
export const mnemonicImport = data => Axios.post('/removecenterwallet/Remove_center_wallet/mnemonicImport', data);
// =========私钥导入=================
export const privatekeyImport = data => Axios.post('/removecenterwallet/Remove_center_wallet/privatekeyImport', data);

// =========账户余额=================
export const getBalance = data => Axios.post('/removecenterwallet/Remove_center_wallet/getBalance', data);
// =========查询币种=================
export const getCoinList = data => Axios.post('/removecenterwallet/Remove_center_wallet/coin_list', data);

// =========转账记录=================
export const getTransfersList = data => Axios.post('/removecenterwallet/Remove_center_wallet/transfersListNew', data);
// ============转账==================
export const contentTransfer = data => Axios.post('/removecenterwallet/Remove_center_wallet/transfer', data);

