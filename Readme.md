# GSMTasks API
This repository tracks the OpenAPI document for [GSMTasks](https://gsmtasks.com) [API](https://api.gsmtasks.com/docs/).

The latest version can be found in [opnapi.yaml](openapi.yaml).

If you want to see changes from the previous version, compare openapi.slim.yaml between branches.
It removes all boilerplate like version in the media type or some trivial examples.

# Inactivity

The tracking script uses Github Action with cron trigger, which may stop working if there are no updates for 60 days. If you notice this happening, please ping me in a discussion.

# Rewrite

This repository has been recently rewritten. If you need to access the old commits, see branch main-old.

# Version tags

The upstream openapi.yaml often changes without updating its `info.version` field,
making it impossible to consider the current iteration final until a `info.version` changes also.

# "Slim" files

The upstream openapi.yaml is updated regularly, with each update containing different example dates and UUIDs,
and using a versioned MIME type that changes with every info.version,
making the differences between successive updates cluttered with boilerplate and difficult to read.

## openapi.slim.yaml

It's the openapi.yaml processed with sed, replacing example dates, UUIDs, and version numbers in media types with placeholders: ${date}, ${uuid}, and ${version}.

## openapi.slim2.yaml

This is another version processed with [betterer-json](https://github.com/python-lapidary/betterer-json) script,
with uuid examples removed,
date examples replaced with a constant value,
and version in mime types replaced with a placeholder.
