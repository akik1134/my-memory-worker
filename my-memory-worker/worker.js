export default {
  async fetch(request, env) {



console.log(
  "REQUEST PATH:",
  new URL(request.url).pathname
);

console.log(
  "REQUEST METHOD:",
  request.method
);




    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    try {

      // ====
      // GET
      // ====

      if (path === "/search" && method === "GET") {
        return await searchMemory(url, env);
      }

      if (path === "/latest" && method === "GET") {
        return await latestMemory(env);
      }

      if (path === "/random" && method === "GET") {
        return await randomMemory(env);
      }

      if (path === "/count" && method === "GET") {
        return await countMemory(env);
      }

      if (path === "/list" && method === "GET") {
        return await listMemory(env);
      }

      if (path.startsWith("/get/") && method === "GET") {
        return await getMemory(path, env);
      }

      if (path === "/date" && method === "GET") {
        return await searchDate(url, env);
      }

      if (path === "/title" && method === "GET") {
        return await searchTitle(url, env);
      }

      if (path === "/summary" && method === "GET") {
        return await searchSummary(url, env);
      }

      if (path.startsWith("/related/") && method === "GET") {
        return await relatedMemory(path, env);
      }

      if (path === "/category" && method === "GET") {
        return await searchCategory(url, env);
      }

      if (path === "/priority" && method === "GET") {
        return await searchPriority(url, env);
      }

      if (path === "/favorite" && method === "GET") {
        return await favoriteList(env);
      }


      // =====
      // POST
      // =====

      if (path === "/save" && method === "POST") {
        return await saveMemory(request, env);
      }

      if (path.startsWith("/update/") && method === "POST") {
        return await updateMemory(path, request, env);
      }

      if (path.startsWith("/delete/") && method === "POST") {
        return await deleteMemory(path, env);
      }

      if (path.startsWith("/tags/") && method === "POST") {
        return await updateTags(path, request, env);
      }

      if (path.startsWith("/summary/") && method === "POST") {
        return await updateSummary(path, request, env);
      }

      if (path.startsWith("/category/") && method === "POST") {
        return await updateCategory(path, request, env);
      }

      if (path.startsWith("/priority/") && method === "POST") {
        return await updatePriority(path, request, env);
      }

      if (path.startsWith("/favorite/") && method === "POST") {
        return await updateFavorite(path, request, env);
      }

      // ===========================================
// ▼ 新しいAPI追加位置（今後ここへ追加）
// ===========================================

if (path === "/gateway" && method === "POST") {
  return await gateway(request, env);
}

if (path === "/filter" && method === "GET") {
  return await filterMemory(url, env);
}

if (path === "/dashboard" && method === "GET") {
  return await dashboard(env);
}

if (path === "/stats" && method === "GET") {
  return await systemStats(env);
}

if (path === "/favorites/count" && method === "GET") {
  return await favoriteCount(env);
}

if (path === "/tags" && method === "GET") {
  return await searchTags(url, env);
}

if (path.startsWith("/title/") && method === "POST") {
  return await updateTitle(path, request, env);
}

// ここから新しいAPIルートを追加する

if (path === "/tag" && method === "GET") {
  return await searchTag(url, env);
}

if (path.startsWith("/tag/") && method === "POST") {
  return await updateTag(path, request, env);
}

// ===========================================
// ▲ 新しいAPI追加位置ここまで
// ===========================================

      return new Response("Not Found", {
        status: 404
      });


    } catch (e) {

      return new Response(
        JSON.stringify({
          error: e.message
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

    }

  }

};


// ====================================================
// ここから下に関数を追加していく
// この目印より上は基本的に変更しない
// ====================================================

// ===========================================
// Gateway Builder
//
// ルール
// ・caseを1つずつ追加する
// ・追加後は毎回Deployして確認する
// ・既存APIを書き換えず再利用する
// ===========================================

async function gateway(request, env) {


console.log(
  "GATEWAY ENTER"
);



/*
const requestContext =
  createRequestContext();
*/





// =================================
// GATEWAY v3.0
// Block A-1 Request Normalize Layer
// =================================


let body = await request.json();


// Array形式対応

if (Array.isArray(body)) {

  body = body[body.length - 1];

}


// text JSON形式対応

if (
  typeof body.text === "string"
) {

  try {

    body = JSON.parse(body.text);

  }

  catch(e){

    return Response.json({

      success:false,

      error:"INVALID_JSON_TEXT"

    });

  }

}


// action/data形式統一

if (
  body.action &&
  !body.data
) {

  const action =
    body.action;


  const clone = {
    ...body
  };


  delete clone.action;


  body = {

    action,

    data:clone

  };

}


// data保証

if (!body.data) {

  body.data={};

}


console.log(
"V3 NORMALIZED BODY:",
JSON.stringify(body)
);


  console.log("PARSED BODY:", JSON.stringify(body));

const action = body.action;


console.log(
  "GATEWAY ACTION:",
  action
);




const actionAlias = {

  registryTest:"registryTest",

fullSearch:"search",
searchAll:"search",
combinedSearch:"search",
multiSearch:"search",


  latestPick:"latest",
  recentList:"list",
  latestSummary:"latest",

  updateGeneral:"update",
  fullUpdate:"update"

};











// ====================
// Block B-002
// Gateway Data Scope
// ====================

const data = body.data || {};


// ====================
// GATEWAY-110
// Gateway Metadata
// Version Information
// ====================

const GATEWAY_INFO = Object.freeze({

  name:
    "Gateway Core",

  version:
    "3.1",

  build:
    "2026-07-14",

  mode:
    "registry",

  framework:
    "Registry Driven Gateway",

  registryVersion:
    "1.1",

  responseVersion:
    "1.0",

  apiVersion:
    "v1"

});


// ===========================================
// STEP-049-005-001
// Runtime Context Layer
//
// AI Autonomous Memory Runtime基盤
// ===========================================


function createRuntimeContext({

  action = null,

  data = {},

  source = "gateway"

}) {


  return Object.freeze({

    runtimeId:
      crypto.randomUUID(),


    timestamp:
      new Date().toISOString(),


    source,


    action,


    data,


    policy: {

      evaluated:false,

      decision:null

    },


    memory: {

      target:null,

      operation:null,

      importance:null

    },


    gateway: {

      version:
        GATEWAY_INFO.version,


      mode:
        GATEWAY_INFO.mode

    }

  });


}


// ===========================================
// Runtime Context Instance
//
// Gateway Scope Runtime Object
// ===========================================


const requestContext =
  createRuntimeContext({

    action,

    data,

    source:
      "gateway"

  });


// ===========================================
// GATEWAY-001
// Action Registry
// Registry Root
// ===========================================

const actionRegistry = {};





















// =================================
// GATEWAY-111
// Registry Metadata Expansion
// GATEWAY-026 Type Metadata Support
// =================================


function registerAction(config) {

  actionRegistry[config.name] = {

    id:
      config.id || null,


    name:
      config.name,


    category:
      config.category || "GENERAL",


    description:
      config.description || "",


    required:
      config.required || [],


    optional:
      config.optional || [],


    types:
      config.types || {},


    version:
      config.version || "1.0",


    enabled:
      config.enabled !== false,


    handler:
      config.handler || null

  };

}



// ===========================================
// STEP-049-006-002
// Registry Loader Layer 復旧版
//
// registryDefinitions → actionRegistry
// ===========================================


function loadRegistry(definitions) {


  if (!Array.isArray(definitions)) {


    console.log(
      "Registry Loader Error: definitions is not array"
    );


    return;


  }



  definitions.forEach(

    (definition)=>{

      registerAction(
        definition
      );

    }

  );



  console.log(

    "Registry Loader Loaded:",

    definitions.length

  );


}


// ===================
// FULL UPDATE MEMORY
// 全項目更新
// ===================

async function fullUpdateMemory(data, env) {

  if (!data.id) {

    return Response.json({

      success:false,

      error:"id is required"

    });

  }


  await env.DB.prepare(
`
UPDATE memories
SET

message = ?,
title = ?,
tag = ?,
tags = ?,
category = ?,
priority = ?,
favorite = ?,
summary = ?,
updated_at = CURRENT_TIMESTAMP

WHERE id = ?

`
  )
  .bind(

    data.message || "",

    data.title || null,

    data.tag || null,

    data.tags || null,

    data.category || null,

    data.priority || 0,

    data.favorite || 0,

    data.summary || null,

    data.id

  )
  .run();


  return Response.json({

    success:true,

    id:data.id,

    updated:true,

    mode:"fullUpdate"

  });

}

// ===================================
// Registry Initial Actions
// GATEWAY-005 Registry
// TASK-006 Version / Enabled Support
// Handler Binding Complete
// ===================================

const registryDefinitions = [

  {
    id:"GATEWAY-001",
    name:"search",
    category:"SEARCH",
    description:"Memory全文検索",
    required:["q"],
    optional:[],
    types:{
      q:"string"
    },
    version:"1.0",
    enabled:true,
    handler:"search"
  },

  {
    id:"GATEWAY-002",
    name:"count",
    category:"SYSTEM",
    description:"件数取得",
    required:[],
    optional:[],
    types:{},
    version:"1.0",
    enabled:true,
    handler:"count"
  },

  {
    id:"GATEWAY-003",
    name:"stats",
    category:"SYSTEM",
    description:"統計取得",
    required:[],
    optional:[],
    types:{},
    version:"1.0",
    enabled:true,
    handler:"stats"
  },

  {
    id:"GATEWAY-004",
    name:"health",
    category:"SYSTEM",
    description:"Gateway状態確認",
    required:[],
    optional:[],
    types:{},
    version:"1.0",
    enabled:true,
    handler:"health"
  },

  {
    id:"GATEWAY-005",
    name:"dashboard",
    category:"SYSTEM",
    description:"ダッシュボード",
    required:[],
    optional:[],
    types:{},
    version:"1.0",
    enabled:true,
    handler:"dashboard"
  },

  {
    id:"GATEWAY-006",
    name:"favoritesCount",
    category:"SYSTEM",
    description:"お気に入り件数取得",
    required:[],
    optional:[],
    types:{},
    version:"2.6",
    enabled:true,
    handler:"favoritesCount"
  },

  {
    id:"GATEWAY-007",
    name:"latest",
    category:"MEMORY",
    description:"最新記憶取得",
    required:[],
    optional:[],
    types:{},
    version:"1.0",
    enabled:true,
    handler:"latest"
  },

  {
    id:"GATEWAY-008",
    name:"random",
    category:"MEMORY",
    description:"ランダム取得",
    required:[],
    optional:[],
    types:{},
    version:"1.0",
    enabled:true,
    handler:"random"
  },

  {
    id:"GATEWAY-009",
    name:"favorite",
    category:"MEMORY",
    description:"お気に入り一覧",
    required:[],
    optional:[],
    types:{},
    version:"1.0",
    enabled:true,
    handler:"favorite"
  },

  {
    id:"GATEWAY-010",
    name:"get",
    category:"CRUD",
    description:"1件取得",
    required:["id"],
    optional:[],
    types:{
      id:"number"
    },
    version:"1.0",
    enabled:true,
    handler:"get"
  },

  {
    id:"GATEWAY-011",
    name:"save",
    category:"CRUD",
    description:"Memory保存",
    required:["message"],
    optional:[
      "title",
      "tag",
      "tags",
      "category",
      "priority",
      "favorite",
      "summary"
    ],
    types:{
      message:"string",
      title:"string",
      tag:"string",
      tags:"string",
      category:"string",
      priority:"number",
      favorite:"number",
      summary:"string"
    },
    version:"1.0",
    enabled:true,
    handler:"save"
  },

  {
    id:"GATEWAY-012",
    name:"update",
    category:"CRUD",
    description:"Memory更新",
    required:[
      "id",
      "message"
    ],
    optional:[],
    types:{
      id:"number",
      message:"string"
    },
    version:"1.0",
    enabled:true,
    handler:"update"
  },

  {
    id:"GATEWAY-013",
    name:"delete",
    category:"CRUD",
    description:"Memory削除",
    required:["id"],
    optional:[],
    types:{
      id:"number"
    },
    version:"1.0",
    enabled:true,
    handler:"delete"
  },

  {
    id:"GATEWAY-014",
    name:"related",
    category:"SEARCH",
    description:"関連記憶検索",
    required:["id"],
    optional:[],
    types:{
      id:"number"
    },
    version:"1.0",
    enabled:true,
    handler:"related"
  },

  {
    id:"GATEWAY-015",
    name:"list",
    category:"MEMORY",
    description:"Memory一覧取得",
    required:[],
    optional:[],
    types:{},
    version:"1.0",
    enabled:true,
    handler:"list"
  },

  {
    id:"GATEWAY-016",
    name:"filter",
    category:"SEARCH",
    description:"条件付きMemory検索",
    required:[],
    optional:[
      "tag",
      "category",
      "priority",
      "favorite"
    ],
    types:{
      tag:"string",
      category:"string",
      priority:"number",
      favorite:"number"
    },
    version:"1.0",
    enabled:true,
    handler:"filter"
  },

   // =======================
// Registry Initial Actions
// Block 2/3
// GATEWAY-017 ～ GATEWAY-025
// ==========================


{
  id:"GATEWAY-017",
  name:"searchUnified",
  category:"SEARCH",
  description:"Memory全項目横断検索",
  required:["q"],
  optional:[],
  version:"2.6",
  enabled:true,
  handler:"searchUnified"
},


{
  id:"GATEWAY-018",
  name:"priority",
  category:"SEARCH",
  description:"Priority条件検索",
  required:["q"],
  optional:[],
  version:"2.6",
  enabled:true,
  handler:"priority"
},


{
  id:"GATEWAY-019",
  name:"registryAudit",
  category:"SYSTEM",
  description:"Registry・Handler整合性確認",
  required:[],
  optional:[],
  version:"2.6",
  enabled:true,
  handler:"registryAudit"
},


{
  id:"GATEWAY-020",
  name:"manifest",
  category:"SYSTEM",
  description:"Registry Manifest取得",
  required:[],
  optional:[],
  version:"2.6",
  enabled:true,
  handler:"manifest"
},


{
  id:"GATEWAY-021",
  name:"help",
  category:"SYSTEM",
  description:"Registry Action Help取得",
  required:["action"],
  optional:[],
  version:"2.6",
  enabled:true,
  handler:"help"
},


{
  id:"GATEWAY-022",
  name:"selfCheck",
  category:"SYSTEM",
  description:"Gateway Self Check実行",
  required:[],
  optional:[],
  version:"2.6",
  enabled:true,
  handler:"selfCheck"
},


{
  id:"GATEWAY-023",
  name:"diagnostics",
  category:"SYSTEM",
  description:"Gateway Full Diagnostics実行",
  required:[],
  optional:[],
  version:"2.6",
  enabled:true,
  handler:"diagnostics"
},


{
  id:"GATEWAY-024",
  name:"runtimeTest",
  category:"SYSTEM",
  description:"Gateway Runtime Test Suite実行",
  required:[],
  optional:[],
  version:"2.6",
  enabled:true,
  handler:"runtimeTest"
},


{
  id:"GATEWAY-025",
  name:"coverageCheck",
  category:"SYSTEM",
  description:"Registry Handler Coverage確認",
  required:[],
  optional:[],
  version:"2.6",
  enabled:true,
  handler:"coverageCheck"
},

{
  id:"GATEWAY-026",
  name:"successTest",
  category:"SYSTEM",
  description:"Success Response Builder Test",
  required:[],
  optional:[],
  types:{},
  version:"3.0",
  enabled:true,
  handler:"successTest"
},
















// ===========================================
// Registry Initial Actions
// Block 3/3
// Final Close
// ===========================================


];

loadRegistry(
  registryDefinitions
);


console.log(
 "SAVE CHECK:",
 actionRegistry.save
);

console.log(
  "REGISTRY CHECK:",
  Object.keys(actionRegistry)
);

console.log(
  "MANIFEST CHECK:",
  actionRegistry.manifest
);

console.log(
  "REGISTRY COUNT:",
  Object.keys(actionRegistry).length
);




// ================================
// Registry Initialization Complete
// ================================

console.log(
  "Action Registry Loaded:",
  Object.keys(actionRegistry).length
);

// ===========================================
// STEP-050-002-⑤-③ 修正版
// Registry Initialization Safe Boundary
//
// Registry完成後確認Layer
//
// 目的:
// actionRegistry生成完了を保証する
// ===========================================


const registryInitializationStatus = {

  ready:
    typeof actionRegistry !== "undefined"
    &&
    Object.keys(actionRegistry).length > 0,


  count:
    typeof actionRegistry !== "undefined"
    ?
    Object.keys(actionRegistry).length
    :
    0

};


console.log(

  "Registry Initialization Status:",

  registryInitializationStatus

);

// ===========================================
// GATEWAY-028-001
// Runtime Context Layer
//
// Request Context Factory
// Scope Safe Version
// ===========================================

/*
function createRequestContext(){

  return Object.freeze({

    requestId:
      crypto.randomUUID(),

    timestamp:
      new Date().toISOString(),

    gateway:
      GATEWAY_INFO.name,

    version:
      GATEWAY_INFO.version,

    build:
      GATEWAY_INFO.build,

    mode:
      GATEWAY_INFO.mode,

    runtime:
      "registry",

    contextVersion:
      "1.0"

  });

}
*/









// ===================================
// GATEWAY-029
// Response Formatter
// Unified Gateway Response Framework
// ===================================

function formatGatewayResponse({

  success,

  action = null,

  data = null,

  error = null,

  details = null

}){

  return {

    success,

    gateway:"online",

    version:GATEWAY_INFO.version,

    build:GATEWAY_INFO.build,

    mode:GATEWAY_INFO.mode,

    requestId:
      requestContext.requestId,

    timestamp:
      requestContext.timestamp,

    action,

    data,

    error,

    details

  };

}

// ======================================
// GATEWAY-028-002
// Request Metadata統一
//
// Runtime Metadata Injection Layer
// ======================================


body.meta = Object.freeze({

  requestId:
    requestContext.requestId,


  timestamp:
    requestContext.timestamp,


  gateway:
    requestContext.gateway,


  version:
    requestContext.version,


  build:
    requestContext.build,


  mode:
    requestContext.mode,


  action:
    requestContext.action,


  contextVersion:
    requestContext.contextVersion

});


// ===========================================
// GATEWAY-027-011
// Registry Error Handling Standardization
//
// Unified Error Response Builder
// ===========================================


function errorResponse({

  error,

  action = null,

  details = null,

  code = "GATEWAY_ERROR"

}) {


  const response = {

    success:false,

    gateway:
      "Gateway Core",

    version:
      GATEWAY_INFO.version,

    build:
      GATEWAY_INFO.build,

    mode:
      GATEWAY_INFO.mode,


    error: {

      code,

      message:
        error

    },


    action

  };


  if(details){

    response.details =
      details;

  }


  return Response.json(
    response
  );


}


// ===================================
// Gateway Core v3.0
// Block A-2.1 Validation Layer
// ===================================

function validateActionRegistry(actionName) {

  console.log(
    "VALIDATE ACTION:",
    actionName
  );

  console.log(
    "REGISTRY SIZE:",
    Object.keys(actionRegistry).length
  );

  console.log(
    "HAS MANIFEST:",
    !!actionRegistry.manifest
  );

  console.log(
    "REGISTRY KEYS:",
    JSON.stringify(
      Object.keys(actionRegistry)
    )
  );

  const action =
    actionRegistry[actionName];

  if (!action) {

    return {

      valid:false,

      error:"Action not found"

    };

  }

  if(action.enabled !== true){

    return {

      valid:false,

      error:"Action disabled"

    };

  }

  return {

    valid:true,

    action

  };

}


// ==============================
// GATEWAY-105 MEMORY TAGS SEARCH
// GET /tags?q=keyword
// ==============================

async function searchTags(url, env) {

  const keyword = url.searchParams.get("q");

  if (!keyword) {
    return new Response(
      "q parameter is required",
      { status: 400 }
    );
  }

  const result = await env.DB.prepare(`
    SELECT *
    FROM memories
    WHERE tags LIKE ?
    ORDER BY id DESC
  `)
  .bind(`%${keyword}%`)
  .all();

  return Response.json(result.results);

}


// ===============================
// GATEWAY-106 MEMORY DATE SEARCH
// GET /date?q=YYYY-MM-DD
// ===============================

async function searchDate(url, env) {

  const keyword = url.searchParams.get("q");

  if (!keyword) {
    return new Response(
      "q parameter is required",
      { status: 400 }
    );
  }

  const result = await env.DB.prepare(`
    SELECT *
    FROM memories
    WHERE DATE(created_at)=DATE(?)
    ORDER BY id DESC
  `)
  .bind(keyword)
  .all();

  return Response.json(result.results);

}


// ================================
// GATEWAY-101 MEMORY TITLE SEARCH
// GET /title?q=keyword
// ================================

async function searchTitle(url, env) {

  const keyword = url.searchParams.get("q");

  if (!keyword) {

    return new Response(
      "q parameter is required",
      {
        status:400
      }
    );

  }

  const result = await env.DB.prepare(`
    SELECT *
    FROM memories
    WHERE title LIKE ?
    ORDER BY id DESC
  `)
  .bind(
    `%${keyword}%`
  )
  .all();

  return Response.json(
    result.results
  );

}

// ==================================
// GATEWAY-102 MEMORY SUMMARY SEARCH
// GET /summary?q=keyword
// ==================================

async function searchSummary(url, env) {

  const keyword = url.searchParams.get("q");

  if (!keyword) {

    return new Response(
      "q parameter is required",
      {
        status:400
      }
    );

  }

  const result = await env.DB.prepare(`
    SELECT *
    FROM memories
    WHERE summary LIKE ?
    ORDER BY id DESC
  `)
  .bind(
    `%${keyword}%`
  )
  .all();

  return Response.json(
    result.results
  );

}

// ==============================
// GATEWAY-103 MEMORY TAG SEARCH
// GET /tag?q=keyword
// ==============================

async function searchTag(url, env) {

  const keyword = url.searchParams.get("q");

  if (!keyword) {

    return new Response(
      "q parameter is required",
      {
        status:400
      }
    );

  }

  const result = await env.DB.prepare(`
    SELECT *
    FROM memories
    WHERE tag LIKE ?
    ORDER BY id DESC
  `)
  .bind(
    `%${keyword}%`
  )
  .all();

  return Response.json(
    result.results
  );

}

// ==================================
// GATEWAY-104 MEMORY CATEGORY SEARCH
// GET /category?q=keyword
// ==================================

async function searchCategory(url, env) {

  const keyword = url.searchParams.get("q");

  if (!keyword) {

    return new Response(
      "q parameter is required",
      {
        status:400
      }
    );

  }

  const result = await env.DB.prepare(`
    SELECT *
    FROM memories
    WHERE category LIKE ?
    ORDER BY id DESC
  `)
  .bind(
    `%${keyword}%`
  )
  .all();

  return Response.json(
    result.results
  );

}

// ===========================================
// GatewaySimpleGetter
// 共通GET取得ヘルパー
// ===========================================

function GatewaySimpleGetter(apiFunction, env) {

  return apiFunction(env);

}

// ===========================================
// GatewaySearchHelper
// 共通検索GETヘルパー
// ===========================================

function GatewaySearchHelper(

  endpoint,

  apiFunction,

  keyword,

  env

) {


  const url = new URL(

    "http://gateway" + endpoint

  );


  url.searchParams.set(

    "q",

    keyword || ""

  );


  return apiFunction(

    url,

    env

  );

}

// ===========================================
// GatewayIdAction
// ID指定共通アクションヘルパー
// ===========================================

async function GatewayIdAction(
  data,
  endpoint,
  apiFunction,
  env
){


  if (!data.id) {

    return Response.json({

      success:false,

      error:"id is required"

    });

  }


  return await apiFunction(

    `${endpoint}/${data.id}`,

    env

  );

}

// ===========================================
// GatewayUpdateHelper
// 更新系共通アクションヘルパー
// ===========================================

async function GatewayUpdateHelper(
  data,
  endpoint,
  apiFunction,
  env
){

  if (!data.id) {

    return Response.json({

      success:false,

      error:"id is required"

    });

  }


  return await apiFunction(

    `${endpoint}/${data.id}`,

    new Request(
      `http://gateway${endpoint}`,
      {

        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify(data)

      }
    ),

    env

  );

}

// ===========================================
// STEP-049-007-001
// Handler Registry Core
//
// Action Handler Module化 基礎層
// ===========================================


const handlerRegistry = {};



// ===========================================
// Handler Register
//
// Handler名と実行関数を登録
// ===========================================

function registerHandler(

  name,

  handler

){

  if(
    typeof handler !== "function"
  ){

    console.error(
      "Invalid handler:",
      name
    );

    return false;

  }


  handlerRegistry[name] =
    handler;


  return true;

}



// ===========================================
// Handler Resolve
//
// RegistryからHandler取得
// ===========================================

function resolveHandler(

  name

){

  return handlerRegistry[name]
    || null;

}



// ===========================================
// Handler Exists Check
//
// Handler存在確認
// ===========================================

function hasHandler(

  name

){

  return typeof handlerRegistry[name]
    === "function";

}










const gatewayActions = {
// =========================
// GATEWAY-091
// Registry Audit v2
//
// Definition
// Registry
// Handler
// 三層整合確認
// =========================

registryAudit: async () => {


  const report = [];


  const definitions =
    typeof registryDefinitions !== "undefined"
      ? registryDefinitions
      : [];



  for (
    const action of definitions
  ) {


    const registered =
      actionRegistry[action.name];


    const handlerExists =
      typeof gatewayActions[action.handler]
      === "function";



    report.push({

      id:
        action.id,

      name:
        action.name,

      registryExists:
        !!registered,

      handler:
        action.handler,

      handlerExists

    });


  }



  const missingRegistry =
    report.filter(

      item =>
      item.registryExists === false

    );



  const missingHandler =
    report.filter(

      item =>
      item.handlerExists === false

    );



  return Response.json({

    success:

      missingRegistry.length === 0
      &&
      missingHandler.length === 0,


    gateway:"online",


    version:
      GATEWAY_INFO.version,


    audit:"Registry v2",


    definitionCount:
      definitions.length,


    registryCount:
      Object.keys(actionRegistry).length,


    missingRegistry:
      missingRegistry.length,


    missingHandler:
      missingHandler.length,


    report

  });


},

// =============================
// GATEWAY-026
// Success Response Builder Test
// =============================

successTest: async () => {

  return successResponse({

    test:
      "successResponseBuilder",

    status:
      "OK"

  });

},

// ===================================
// GATEWAY-026 REGISTRY COVERAGE CHECK
// Registry実行対応確認
// ===================================

coverageCheck: async () => {

  const report = [];

  for (
    const action of Object.values(actionRegistry)
  ) {

    const handlerExists =
      typeof gatewayActions[action.handler]
      === "function";


    report.push({

      id: action.id,

      name: action.name,

      handler: action.handler,

      required:
        action.required,

      handlerExists

    });

  }


  const failed =
    report.filter(
      item =>
      item.handlerExists === false
    );


  return Response.json({

    success:
      failed.length === 0,


    gateway:"online",

    test:
      "registryCoverage",


    total:
      report.length,


    failed:
      failed.length,


    report

  });

},

// ================================
// GATEWAY-018 PRIORITY SEARCH
// GatewaySearchHelper移行
// ================================

priority: async () => {

  return await GatewaySearchHelper(

    "/priority",

    searchPriority,

    data.q,

    env

  );

},

// =================================
// GATEWAY-090 REGISTRY ROUTER TEST
// Registry経由 Action実行テスト
// =================================

registryTest: async () => {

  const target =
    data.action || "health";


  const registry =
    actionRegistry[target];


  if (!registry) {

    return Response.json({

      success:false,

      error:"Registry action not found",

      action:target

    });

  }


  if (registry.enabled !== true) {

    return Response.json({

      success:false,

      error:"Action disabled",

      action:target

    });

  }


  const handler =
    gatewayActions[target];


  if (
    typeof handler !== "function"
  ) {

    return Response.json({

      success:false,

      error:"Handler not found",

      action:target

    });

  }


  return await handler();

},


// =========================
// GATEWAY-023
// DIAGNOSTICS PHASE2
// Gateway Full Diagnostics
// =========================

diagnostics: async () => {


  let database = false;


  try {

    await env.DB
      .prepare("SELECT 1")
      .first();

    database = true;


  } catch (e) {

    database = false;

  }



  const total =
    Object.keys(actionRegistry).length;



  const enabled =
    Object.values(actionRegistry)
      .filter(a => a.enabled)
      .length;



  const disabled =
    total - enabled;



  let memoryCount = 0;

  let favoriteCount = 0;

  let latestId = null;



  try {


    const count =
      await env.DB
        .prepare(
          "SELECT COUNT(*) AS count FROM memories"
        )
        .first();


    memoryCount =
      count?.count || 0;



    const favorite =
      await env.DB
        .prepare(
          "SELECT COUNT(*) AS count FROM memories WHERE favorite = 1"
        )
        .first();


    favoriteCount =
      favorite?.count || 0;



    const latest =
      await env.DB
        .prepare(
          "SELECT id FROM memories ORDER BY id DESC LIMIT 1"
        )
        .first();


    latestId =
      latest?.id || null;


  } catch(e) {


    memoryCount = 0;

    favoriteCount = 0;

    latestId = null;


  }



  return Response.json({


    success:true,


    gateway:"online",


    version:GATEWAY_INFO.version,


    build:GATEWAY_INFO.build,


    mode:GATEWAY_INFO.mode,


    diagnostics:{


      database,


      registry:{


        total,

        enabled,

        disabled


      },


      runtime:{


        validation:true,

        router:true,

        alias:true


      },


      memory:{


        count:memoryCount,

        favorites:favoriteCount,

        latestId


      },


      worker:{


        version:GATEWAY_INFO.version,

        build:GATEWAY_INFO.build,

        mode:GATEWAY_INFO.mode


      }


    }


  });


},

// ===========================
// GATEWAY-024 RUNTIME TEST
// Gateway Runtime Test Suite
// ===========================

runtimeTest: async () => {

  const result = {};

  result.health =
    typeof gatewayActions.health === "function";

  result.manifest =
    typeof gatewayActions.manifest === "function";

  result.registryAudit =
    typeof gatewayActions.registryAudit === "function";

  result.selfCheck =
    typeof gatewayActions.selfCheck === "function";

  result.diagnostics =
    typeof gatewayActions.diagnostics === "function";


  result.registryCount =
    Object.keys(actionRegistry).length;


  result.database = false;


  try {

    await env.DB
      .prepare("SELECT 1")
      .first();

    result.database = true;

  } catch(e) {

    result.database = false;

  }


  return Response.json({

    success:
      Object.values(result)
      .every(v => v === true || typeof v === "number"),

    gateway:"online",

    test:"runtimeTest",

    result

  });

},

// =======================
// GATEWAY-089 SELF CHECK
// Registry SelfCheck
// =======================

selfCheck: async () => {

  const checks = {};

  checks.router = true;

  checks.registry =
    Object.keys(actionRegistry).length > 0;

  checks.manifest =
    typeof gatewayActions.manifest === "function";

  checks.help =
    typeof gatewayActions.help === "function";

checks.health =
  typeof gatewayActions.health === "function";

checks.registryAudit =
  typeof gatewayActions.registryAudit === "function";

  let database = false;

  try {

    await env.DB
      .prepare("SELECT 1")
      .first();

    database = true;

  } catch (e) {

    database = false;

  }

  checks.database = database;

  checks.totalActions =
    Object.keys(actionRegistry).length;

  const success =

    checks.router &&
    checks.registry &&
    checks.manifest &&
    checks.help &&
    checks.database;

  return Response.json({

    success,

    gateway: "online",

 version: GATEWAY_INFO.version,

build: GATEWAY_INFO.build,

mode: GATEWAY_INFO.mode,

    checks

  });

},
// ==================
// GATEWAY-088 HELP
// Registry Auto Help
// ==================

help: async () => {

  const target = data.action;

  if (!target) {

    return Response.json({

      success:false,

      error:"action is required"

    });

  }

  const info = actionRegistry[target];

  if (!info) {

    return Response.json({

      success:false,

      error:"Unknown action"

    });

  }

  return Response.json({

    success:true,

    ...info

  });

},

// =====================
// GATEWAY-087 MANIFEST
// Registry完全版
// =====================

manifest: async () => {

  return Response.json({

    success: true,

    gateway: "online",

    version: "2.6",

    totalActions: Object.keys(actionRegistry).length,

    actions: Object.values(actionRegistry)

  });

},

 
// ==================================
// GATEWAY-072 MEMORY FAVORITE TOGGLE
// ==================================

favoriteToggle: async () => {

  if (!data.id) {

    return Response.json({

      success:false,

      error:"id is required"

    });

  }


  return await updateFavorite(

    `/favorite/${data.id}`,

    new Request(
      "http://gateway/favorite",
      {

        method:"POST",

        headers:{
          "Content-Type":
          "application/json"
        },

        body:
        JSON.stringify(data)

      }
    ),

    env

  );

},


// =========================
// GATEWAY-074 FULL UPDATE
// 現在はupdateMemory共有
// 将来、全フィールド更新化予定
// =========================

fullUpdate: async () => {

  if (!data.id) {

    return Response.json({

      success:false,

      error:"id is required"

    });

  }


  return await fullUpdateMemory(

    `/update/${data.id}`,

    new Request(
      "http://gateway/update",
      {

        method:"POST",

        headers:{
          "Content-Type":
          "application/json"
        },

        body:
        JSON.stringify(data)

      }
    ),

    env

  );

},


// ==========================
// GATEWAY-075 MEMORY STATUS
// ==========================

memoryStatus: async () => {

  const count = await countMemory(
    env
  );


  return Response.json({

    success:true,

    status:"online",

    count:count

  });

},


  // ===================================
// GATEWAY-046 MEMORY TITLE SEARCH EXACT
// =====================================

titleExact: async () => {

  const url = new URL(
    "http://gateway/title"
  );


  url.searchParams.set(
    "q",
    data.q || ""
  );


  return await searchTitle(
    url,
    env
  );

},


// =============================
// GATEWAY-037 TAG UPDATE MULTI
// =============================

updateTags: async () => {

  if (!data.id) {

    return Response.json({

      success:false,

      error:"id is required"

    });

  }


  return await updateTags(

    `/tags/${data.id}`,

    new Request(
      "http://gateway/tags",
      {

        method:"POST",

        headers:{
          "Content-Type":
          "application/json"
        },

        body:
        JSON.stringify(data)

      }
    ),

    env

  );

},


// =========================
// GATEWAY-031 FILTER MEMORY
// =========================

filter: async () => {

  const url = new URL(
    "http://gateway/filter"
  );


  if (data.tag)
    url.searchParams.set(
      "tag",
      data.tag
    );


  if (data.category)
    url.searchParams.set(
      "category",
      data.category
    );


  if (data.priority)
    url.searchParams.set(
      "priority",
      data.priority
    );


  if (data.favorite)
    url.searchParams.set(
      "favorite",
      data.favorite
    );


  return await filterMemory(
    url,
    env
  );

},


// ======================
// GATEWAY-025 TAG UPDATE
// ======================

updateTag: async () => {

  if (!data.id) {

    return Response.json({

      success:false,

      error:"id is required"

    });

  }


  return await updateTag(

    `/tag/${data.id}`,

    new Request(
      "http://gateway/tag",
      {

        method:"POST",

        headers:{
          "Content-Type":
          "application/json"
        },

        body:
        JSON.stringify(data)

      }
    ),

    env

  );

},

// ==========================
// GATEWAY-030 LIST MEMORY
// GatewaySimpleGetter移行
// ==========================

list: async () => {

  return await GatewaySimpleGetter(

    listMemory,

    env

  );

},

 // ================================
// GATEWAY-021 DATE SEARCH
// GatewaySearchHelper移行
// ================================

date: async () => {

  return await GatewaySearchHelper(

    "/date",

    searchDate,

    data.q,

    env

  );

},



// ==========================
// GATEWAY-015 TAG UPDATE
// GatewayUpdateHelper移行
// ==========================

tag: async () => {

  return await GatewayUpdateHelper(

    data,

    "/tag",

    updateTag,

    env

  );

},


 // ================================
// GATEWAY-016 TAGS SEARCH
// GatewaySearchHelper移行
// ================================

tags: async () => {

  return await GatewaySearchHelper(

    "/tags",

    searchTags,

    data.q,

    env

  );

},

 // ================================
// GATEWAY-027 TITLE SEARCH
// GatewaySearchHelper移行
// ================================

title: async () => {

  return await GatewaySearchHelper(

    "/title",

    searchTitle,

    data.q,

    env

  );

},


 // ================================
// GATEWAY-028 SUMMARY SEARCH
// GatewaySearchHelper移行
// ================================

summary: async () => {

  return await GatewaySearchHelper(

    "/summary",

    searchSummary,

    data.q,

    env

  );

},


  // ================================
// GATEWAY-029 CATEGORY SEARCH
// GatewaySearchHelper移行
// ================================

category: async () => {

  return await GatewaySearchHelper(

    "/category",

    searchCategory,

    data.q,

    env

  );

},

// ===========================
// GATEWAY-017 SEARCH UNIFIED
// GatewaySearchHelper移行
// ===========================

searchUnified: async () => {

  return await GatewaySearchHelper(

    "/search",

    searchMemory,

    data.q,

    env

  );

},

// ==========================
// GATEWAY-010 GET MEMORY
// GatewayIdAction移行
// ==========================

get: async () => {

  return await GatewayIdAction(

    data,

    "/get",

    getMemory,

    env

  );

},

  // GATEWAY-011 SAVE MEMORY
  save: async () => {

    return await saveMemory(
      new Request("http://gateway/save", {

        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify(data)

      }),
      env
    );

  },


// ==========================
// GATEWAY-012 UPDATE MEMORY
// GatewayUpdateHelper移行
// ==========================

update: async () => {

  return await GatewayUpdateHelper(

    data,

    "/update",

    updateMemory,

    env

  );

},
// ==========================
// GATEWAY-013 DELETE MEMORY
// GatewayIdAction移行
// ==========================

delete: async () => {

  return await GatewayIdAction(

    data,

    "/delete",

    deleteMemory,

    env

  );

},


// ==========================
// GATEWAY-014 RELATED MEMORY
// GatewayIdAction移行
// ==========================

related: async () => {

  return await GatewayIdAction(

    data,

    "/related",

    relatedMemory,

    env

  );

},

// ==========================
// GATEWAY-005 DASHBOARD
// GatewaySimpleGetter移行
// ==========================

dashboard: async () => {

  return await GatewaySimpleGetter(

     dashboardMemory,

    env

  );

},


// ===========================
// GATEWAY-006 FAVORITES COUNT
// GatewaySimpleGetter移行
// ===========================

favoritesCount: async () => {

  return await GatewaySimpleGetter(

    favoriteCount,

    env

  );

},


 // =================
// GATEWAY-007 LATEST
// GatewaySimpleGetter移行
// =================

latest: async () => {

  return await GatewaySimpleGetter(

    latestMemory,

    env

  );

},


// =================
// GATEWAY-008 RANDOM
// GatewaySimpleGetter移行
// =================

random: async () => {

  return await GatewaySimpleGetter(

    randomMemory,

    env

  );

},


// =================
// GATEWAY-009 FAVORITE LIST
// GatewaySimpleGetter移行
// =================

favorite: async () => {

  return await GatewaySimpleGetter(

    favoriteList,

    env

  );

},


 // ================================
 // GATEWAY-001 SEARCH
 // GatewaySearchHelper移行
 // ================================

search: async () => {

  return await GatewaySearchHelper(

    "/search",

    searchMemory,

    data.q,

    env

  );

},

 // GATEWAY-002 COUNT
count: async () => {

  return await GatewaySimpleGetter(

    countMemory,

    env

  );

},


// ==========================
// GATEWAY-003 STATS
// GatewaySimpleGetter移行
// ==========================

stats: async () => {

  return await GatewaySimpleGetter(

    systemStats,

    env

  );

},

// ===================
// GATEWAY-004 HEALTH
// ===================

health: async () => {

  let database = false;

  try {

    await env.DB
      .prepare("SELECT 1")
      .first();

    database = true;

  } catch (e) {

    database = false;

  }

 return successResponse({

    success: true,

    gateway: "online",

    core: "Gateway Core",

    version: "2.6",

    build: "2026-07-11",

    registry: true,

    totalActions: Object.keys(actionRegistry).length,

    mode: "registry",

    database,

    health: database ? "OK" : "ERROR"

  });

},

};














// ===========================================
// STEP-050-001
// Handler Registry Single Binding Layer
//
// gatewayActions → handlerRegistry
//
// Single Registration Control
//
// Rule:
// ・Handler登録はここだけで行う
// ・二重登録禁止
// ・Registry実行経路固定
// ===========================================


function bindGatewayHandlers(){


  const entries =
    Object.entries(
      gatewayActions
    );


  let registered = 0;


  entries.forEach(
    ([name, handler]) => {


      if (
        typeof handler !== "function"
      ){

        console.error(
          "Invalid Gateway Handler:",
          name
        );

        return;

      }


      if(
        handlerRegistry[name]
      ){

        console.log(
          "Handler already exists:",
          name
        );

        return;

      }


      registerHandler(
        name,
        handler
      );


      registered++;


    }
  );


  console.log(
    "Single Handler Binding Complete:",
    registered
  );


  return registered;


}


// ===========================================
// STEP-050-001
// Handler Registry Binding Execute
// ===========================================


bindGatewayHandlers();











// ======================================
// Runtime Context Getter
//
// Unified Access Layer
// ======================================


function getRuntimeContext(){

  return requestContext;

}


// ================
// GATEWAY-113
// Action Resolver
// Action Alias Mapping Layer
// =================


// ================================
// GATEWAY-027-009
// Action Alias Mapping Layer
// ================================


const actionAliasMap = {

  "registryaudit":
    "registryAudit",

  "diagnostics":
    "diagnostics",

  "runtime":
    "runtimeTest",

  "runtimetest":
    "runtimeTest",

  "selfcheck":
    "selfCheck",

  "manifest":
    "manifest",

  "health":
    "health",

  "coverage":
    "coverageCheck",

  "coveragecheck":
    "coverageCheck",

  "successtest":
    "successTest"

};



// ================================
// Action Normalize
// ================================

const normalizedAction =
  String(action || "")
    .trim()
    .toLowerCase();



// ================================
// Alias Resolve
// ================================

const finalAction =
  actionAliasMap[normalizedAction]
  ||
  action;



console.log(
  "Registry Execute:",
  finalAction
);

// =============================
// GATEWAY-025
// Registry Required Validation
// =============================

function validateRequiredParams(
  actionConfig,
  data
){

  const required =
    actionConfig.required || [];


  const missing =
    required.filter(
      key => !data[key]
    );


  if(missing.length > 0){

    return {

      valid:false,

      error:"Missing required parameters",

      missing

    };

  }


  return {

    valid:true

  };

}



// ===================================
// GATEWAY-027
// Registry Validation Error Standard
// ===================================



console.log(
  "AVAILABLE ACTIONS:",
  Object.keys(actionRegistry)
);



console.log("FINAL ACTION:", finalAction);
console.log("REGISTRY KEYS:", Object.keys(actionRegistry));
console.log("MANIFEST ENTRY:", actionRegistry["manifest"]);


const validation =
  validateActionRegistry(finalAction);


if (!validation.valid) {


  return errorResponse({

    error:
      validation.error,

    action:
      finalAction

  });


}



// ===================================
// GATEWAY-027-003
// Required Validation Error Standard
// ===================================


const requiredValidation =
  validateRequiredParams(
    validation.action,
    data
  );


if (!requiredValidation.valid) {


  return errorResponse({

    error:
      requiredValidation.error,

    action:
      finalAction,

    details: {

      missing:
        requiredValidation.missing

    }

  });


}



// ================================
// Unknown Action Standard
// ================================


return errorResponse({

  code:
    "ACTION_NOT_FOUND",

  message:
    "Action not found",

  action:
    finalAction,

  trace:
    {
      timestamp:
        new Date().toISOString(),

      action:
        finalAction

    }

});



// ================================
// Unknown Action Standard
// ================================


return errorResponse({

  code:
    "ACTION_NOT_FOUND",

  message:
    "Action not found",

  action:
    finalAction

});


}


    // ===========================================
    // ▲ Gateway Builder追加位置
    // ===========================================




    // ===========================================
// STEP-049
// Autonomous Memory Runtime Core
// Runtime Entry Layer
// ===========================================


async function autonomousMemoryRuntime(
  input,
  env
){

  const policy =
    await memoryPolicyEngine(
      input
    );


  const decision =
    await memoryDecisionEngine(
      policy
    );


  const gatewayRequest =
    await memoryParameterBuilder(
      decision,
      input
    );


  return await gatewayRuntimeExecute(
    gatewayRequest,
    env
  );

}
// ===========================================
// STEP-049-A
// Memory Policy Engine Skeleton
// ===========================================

async function memoryPolicyEngine(
  input
){

  return {

    intent:"UNKNOWN",

    source:input

  };

}


// ===========================================
// STEP-049-B
// Memory Decision Engine Skeleton
// ===========================================

async function memoryDecisionEngine(
  policy
){

  return {

    action:null,

    policy

  };

}


// ===========================================
// STEP-049-C
// Memory Parameter Builder Skeleton
// ===========================================

async function memoryParameterBuilder(
  decision,
  input
){

  return {

    action:
      decision.action,

    data:{

      message:
        input.message || ""

    }

  };

}


// ===========================================
// STEP-049-D
// Gateway Runtime Bridge
// ===========================================

async function gatewayRuntimeExecute(
  requestData,
  env
){

  return await gateway(

    new Request(
      "http://gateway",
      {

        method:"POST",

        headers:{

          "Content-Type":
          "application/json"

        },

        body:

          JSON.stringify(
            requestData
          )

      }
    ),

    env

  );

}

// =============
// 複数条件検索
// GET /filter
// =============

async function filterMemory(url, env) {

  const tag = url.searchParams.get("tag");
  const category = url.searchParams.get("category");
  const priority = url.searchParams.get("priority");
  const favorite = url.searchParams.get("favorite");

  let sql = "SELECT * FROM memories WHERE 1=1";
  const params = [];

  if (tag) {
    sql += " AND tag = ?";
    params.push(tag);
  }

  if (category) {
    sql += " AND category = ?";
    params.push(category);
  }

  if (priority) {
    sql += " AND priority = ?";
    params.push(priority);
  }

  if (favorite) {
    sql += " AND favorite = ?";
    params.push(favorite);
  }

  sql += " ORDER BY id DESC";

  const result = await env.DB.prepare(sql)
    .bind(...params)
    .all();

  return Response.json(result.results);

}

// ===============
// ダッシュボード
// GET /dashboard
// ===============

async function dashboardMemory(env) {

  const total = await env.DB.prepare(
    "SELECT COUNT(*) AS count FROM memories"
  ).first();

  const favorite = await env.DB.prepare(
    "SELECT COUNT(*) AS count FROM memories WHERE favorite = 1"
  ).first();

  const priority5 = await env.DB.prepare(
    "SELECT COUNT(*) AS count FROM memories WHERE priority = 5"
  ).first();

  const title = await env.DB.prepare(
    "SELECT COUNT(*) AS count FROM memories WHERE title IS NOT NULL"
  ).first();

  const summary = await env.DB.prepare(
    "SELECT COUNT(*) AS count FROM memories WHERE summary IS NOT NULL"
  ).first();

  const latest = await env.DB.prepare(`
    SELECT *
    FROM memories
    ORDER BY id DESC
    LIMIT 5
  `).all();

  return Response.json({

    stats: {

      total: total.count,
      favorite: favorite.count,
      priority5: priority5.count,
      title: title.count,
      summary: summary.count

    },

    latest: latest.results

  });

}

// =============
// システム統計
// GET /stats
// =============

async function systemStats(env) {

  const total = await env.DB.prepare(`
    SELECT COUNT(*) AS count
    FROM memories
  `).first();

  const favorite = await env.DB.prepare(`
    SELECT COUNT(*) AS count
    FROM memories
    WHERE favorite = 1
  `).first();

  const priority5 = await env.DB.prepare(`
    SELECT COUNT(*) AS count
    FROM memories
    WHERE priority = 5
  `).first();

  const title = await env.DB.prepare(`
    SELECT COUNT(*) AS count
    FROM memories
    WHERE title IS NOT NULL
      AND title != ''
  `).first();

  const summary = await env.DB.prepare(`
    SELECT COUNT(*) AS count
    FROM memories
    WHERE summary IS NOT NULL
      AND summary != ''
  `).first();

  return Response.json({

    total: total.count,

    favorite: favorite.count,

    priority5: priority5.count,

    title: title.count,

    summary: summary.count

  });

}

// ====================
// お気に入り件数取得
// GET /favorites/count
// ====================

async function favoriteCount(env) {

  const result = await env.DB.prepare(`
    SELECT COUNT(*) AS count
    FROM memories
    WHERE favorite = 1
  `)
  .first();

  return Response.json(result);

}


// =================
// タイトル更新
// POST /title/:id
// =================

async function updateTitle(path, request, env) {

  const id = path.split("/")[2];

  const body = await request.json();


  await env.DB.prepare(`
    UPDATE memories
    SET title = ?,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `)
  .bind(
    body.title,
    id
  )
  .run();


  return Response.json({
    success:true
  });

}

// =========
// 一覧取得
// GET /list
// =========

async function listMemory(env) {

  const result = await env.DB.prepare(`
    SELECT *
    FROM memories
    ORDER BY id DESC
  `)
  .all();

  return Response.json(result.results);

}


// ===============
// 1件取得
// GET /get/:id
// ===============

async function getMemory(path, env) {

  const id = path.split("/")[2];

  const result = await env.DB.prepare(
    "SELECT * FROM memories WHERE id = ?"
  )
  .bind(id)
  .first();


  if (!result) {

    return new Response(
      "Not Found",
      {
        status:404
      }
    );

  }


  return Response.json(result);

}



// ==============================
// 保存機能（完全版）
// POST /save
//
// body例
// {
//   "message":"本文",
//   "title":"タイトル",
//   "tag":"Cloudflare",
//   "tags":"Cloudflare,D1,API",
//   "category":"開発",
//   "priority":5,
//   "favorite":1,
//   "summary":"要約"
// }
// =============================

async function saveMemory(request, env) {

  const body = await request.json();

  if (!body.message) {

    return new Response(
      "message is required",
      { status: 400 }
    );

  }

  const result = await env.DB.prepare(`
    INSERT INTO memories (
      message,
      title,
      tag,
      tags,
      category,
      priority,
      favorite,
      summary
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `)
  .bind(
    body.message,
    body.title ?? null,
    body.tag ?? null,
    body.tags ?? null,
    body.category ?? null,
    body.priority ?? 0,
    body.favorite ?? 0,
    body.summary ?? null
  )
  .run();

  return Response.json({

    success: true,

    id: result.meta.last_row_id

  });

}


 


// ==================
// 更新
// POST /update/:id
// ==================

async function updateMemory(path, request, env) {

  const id = path.split("/")[2];

  const body = await request.json();


  await env.DB.prepare(
    `
    UPDATE memories
    SET message = ?,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
    `
  )
  .bind(
    body.message,
    id
  )
  .run();


  return Response.json({

    success:true

  });

}


// ====================
// 削除
// POST /delete/:id
// ====================

async function deleteMemory(path, env) {

  const id = path.split("/")[2];


  await env.DB.prepare(
    "DELETE FROM memories WHERE id = ?"
  )
  .bind(id)
  .run();


  return Response.json({

    success:true

  });

}


// ==============================
// 複数タグ更新
// POST /tags/:id
//
// body
// {
//   "tags":"Cloudflare,開発,重要"
// }
// ==============================

async function updateTags(path, request, env) {

  const id = path.split("/")[2];

  const body = await request.json();


  await env.DB.prepare(`
    UPDATE memories
    SET tags = ?,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `)
  .bind(
    body.tags,
    id
  )
  .run();


  return Response.json({

    success:true

  });

}


// ===================
// タグ更新
// POST /tag/:id
//
// body
// {
//   "tag":"仕事"
// }
// ==================

async function updateTag(path, request, env) {

  const id = path.split("/")[2];

  const body = await request.json();


  await env.DB.prepare(`
    UPDATE memories
    SET tag = ?,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `)
  .bind(
    body.tag,
    id
  )
  .run();


  return Response.json({

    success:true

  });

}


// =====================
// Summary更新
// POST /summary/:id
//
// body
// {
//   "summary":"内容"
// }
// =====================

async function updateSummary(path, request, env) {

  const id = path.split("/")[2];

  const body = await request.json();


  await env.DB.prepare(`
    UPDATE memories
    SET summary = ?,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `)
  .bind(
    body.summary,
    id
  )
  .run();


  return Response.json({

    success:true

  });

}
// ===========================
// 関連記憶取得
// GET /related/:id
//
// 同じタグ または 同じカテゴリ
// ===========================

async function relatedMemory(path, env) {

  const id = path.split("/")[2];


  const base = await env.DB.prepare(`
    SELECT *
    FROM memories
    WHERE id = ?
  `)
  .bind(id)
  .first();


  if (!base) {

    return new Response(
      "Not Found",
      {
        status:404
      }
    );

  }


  const result = await env.DB.prepare(`
    SELECT *
    FROM memories
    WHERE id != ?
    AND (
      tag = ?
      OR category = ?
    )
    ORDER BY id DESC
  `)
  .bind(
    id,
    base.tag,
    base.category
  )
  .all();


  return Response.json(result.results);

}


// ======================
// カテゴリ更新
// POST /category/:id
//
// body
// {
//   "category":"仕事"
// }
// ======================

async function updateCategory(path, request, env) {

  const id = path.split("/")[2];

  const body = await request.json();


  await env.DB.prepare(`
    UPDATE memories
    SET category = ?,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `)
  .bind(
    body.category,
    id
  )
  .run();


  return Response.json({

    success:true

  });

}


// ===================
// 優先度検索
// GET /priority?q=5
// ===================

async function searchPriority(url, env) {

  const priority = url.searchParams.get("q");


  if (!priority) {

    return new Response(
      "q parameter is required",
      {
        status:400
      }
    );

  }


  const result = await env.DB.prepare(`
    SELECT *
    FROM memories
    WHERE priority = ?
    ORDER BY id DESC
  `)
  .bind(priority)
  .all();


  return Response.json(result.results);

}


// ====================
// 優先度更新
// POST /priority/:id
//
// body
// {
//   "priority":5
// }
// ====================

async function updatePriority(path, request, env) {

  const id = path.split("/")[2];

  const body = await request.json();


  await env.DB.prepare(`
    UPDATE memories
    SET priority = ?,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `)
  .bind(
    body.priority,
    id
  )
  .run();


  return Response.json({

    success:true

  });

}


// =================
// お気に入り一覧
// GET /favorite
// =================

async function favoriteList(env) {

  const result = await env.DB.prepare(`
    SELECT *
    FROM memories
    WHERE favorite = 1
    ORDER BY id DESC
  `)
  .all();


  return Response.json(result.results);

}


// ===================
// お気に入り更新
// POST /favorite/:id
//
// body
// {
//   "favorite":1
// }
// ==================

async function updateFavorite(path, request, env) {

  const id = path.split("/")[2];

  const body = await request.json();


  await env.DB.prepare(`
    UPDATE memories
    SET favorite = ?,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `)
  .bind(
    body.favorite,
    id
  )
  .run();


  return Response.json({

    success:true

  });

}


// ==============
// 件数取得
// GET /count
// ==============

async function countMemory(env) {

  const result = await env.DB.prepare(`
    SELECT COUNT(*) AS count
    FROM memories
  `)
  .first();


  return Response.json(result);

}


// =============
// 最新取得
// GET /latest
// =============

async function latestMemory(env) {

  const result = await env.DB.prepare(`
    SELECT *
    FROM memories
    ORDER BY id DESC
    LIMIT 1
  `)
  .first();


  return Response.json(result);

}


// ===============
// ランダム取得
// GET /random
// ===============

async function randomMemory(env) {

  const result = await env.DB.prepare(`
    SELECT *
    FROM memories
    ORDER BY RANDOM()
    LIMIT 1
  `)
  .first();


  return Response.json(result);

}


// ===================
// 全文検索
// GET /search?q=文字
// ===================

async function searchMemory(url, env) {

  const keyword = url.searchParams.get("q");


  if (!keyword) {

    return new Response(
      "q parameter is required",
      {
        status:400
      }
    );

  }


  const result = await env.DB.prepare(`
    SELECT *
    FROM memories
    WHERE message LIKE ?
       OR title LIKE ?
       OR summary LIKE ?
       OR tag LIKE ?
       OR category LIKE ?
    ORDER BY id DESC
  `)
  .bind(
    `%${keyword}%`,
    `%${keyword}%`,
    `%${keyword}%`,
    `%${keyword}%`,
    `%${keyword}%`
  )
  .all();


  return Response.json(result.results);

}

// =====================
// Missing Helper Bridge
//
// Registry Search Bridge Layer
// =====================


// =================
// Title Search
// =================

async function searchTitle(url, env) {

  const keyword =
    url.searchParams.get("q");


  if (!keyword) {

    return new Response(
      "q parameter is required",
      {
        status:400
      }
    );

  }


  const result =
    await env.DB.prepare(`
      SELECT *
      FROM memories
      WHERE title LIKE ?
      ORDER BY id DESC
    `)
    .bind(
      `%${keyword}%`
    )
    .all();


  return Response.json(
    result.results
  );

}



// =================
// Tag Search
// =================

async function searchTag(url, env) {

  const keyword =
    url.searchParams.get("q");


  if (!keyword) {

    return new Response(
      "q parameter is required",
      {
        status:400
      }
    );

  }


  const result =
    await env.DB.prepare(`
      SELECT *
      FROM memories
      WHERE tag LIKE ?
      ORDER BY id DESC
    `)
    .bind(
      `%${keyword}%`
    )
    .all();


  return Response.json(
    result.results
  );

}



// =================
// Tags Search
// =================

async function searchTags(url, env) {

  const keyword =
    url.searchParams.get("q");


  if (!keyword) {

    return new Response(
      "q parameter is required",
      {
        status:400
      }
    );

  }


  const result =
    await env.DB.prepare(`
      SELECT *
      FROM memories
      WHERE tags LIKE ?
      ORDER BY id DESC
    `)
    .bind(
      `%${keyword}%`
    )
    .all();


  return Response.json(
    result.results
  );

}



// =================
// Category Search
// =================

async function searchCategory(url, env) {

  const keyword =
    url.searchParams.get("q");


  if (!keyword) {

    return new Response(
      "q parameter is required",
      {
        status:400
      }
    );

  }


  const result =
    await env.DB.prepare(`
      SELECT *
      FROM memories
      WHERE category LIKE ?
      ORDER BY id DESC
    `)
    .bind(
      `%${keyword}%`
    )
    .all();


  return Response.json(
    result.results
  );

}



// =================
// Summary Search
// =================

async function searchSummary(url, env) {

  const keyword =
    url.searchParams.get("q");


  if (!keyword) {

    return new Response(
      "q parameter is required",
      {
        status:400
      }
    );

  }


  const result =
    await env.DB.prepare(`
      SELECT *
      FROM memories
      WHERE summary LIKE ?
      ORDER BY id DESC
    `)
    .bind(
      `%${keyword}%`
    )
    .all();


  return Response.json(
    result.results
  );

}



// =================
// Date Search
// =================

async function searchDate(url, env) {

  const keyword =
    url.searchParams.get("q");


  if (!keyword) {

    return new Response(
      "q parameter is required",
      {
        status:400
      }
    );

  }


  const result =
    await env.DB.prepare(`
      SELECT *
      FROM memories
      WHERE DATE(created_at)=DATE(?)
      ORDER BY id DESC
    `)
    .bind(
      keyword
    )
    .all();


  return Response.json(
    result.results
  );

}