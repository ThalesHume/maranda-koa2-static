  ## V1.0.1 
    modify readme
  ## V1.0.2
    1. read file as stream
    2. add exclude file list opts, if the ctx.path match the exclude array, this middleware this call next
  ## V1.0.3
    modify readme
  ## V2.0.0
    reDesign api
    --folders your static folder array
    --notFoundHandler function whith first arg id ctx, when not found it will be called if you set
    --defer if true, middlwware will be called after the other middleware
  ## V2.0.1
    add generic
  ## V2.0.4
    change the condition,( defer && ctx.body || ctx.status !== 404) TO (defer && (ctx.body || ctx.status !== 404))
  ## V2.0.5
    fix bug: when no index option and path is directory, koa-send return undefined, we thow 404 for you can handle this error;
  ## V2.0.6
    fix bug: request method must in ['HEAD','GET']