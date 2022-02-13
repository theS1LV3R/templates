#!/usr/bin/env bash
# ==============================================================================
# Copyright: GPLv3 (c) 2022-present -- S1LV3R <s1lv3r.codes>
# Date: 2022-02-12
VERSION="0.1.0"
# ==============================================================================

# ==============================================================================
# region Strict mode and debug
# ==============================================================================
orig_argv=("$@")

IFS=$'\n\t'
set -euo pipefail

debug_enabled=0
enable_debug() {
    set -x
    debug_enabled=1
    verbosity=5
}
# If debug is enabled, print commands
if [[ "${DEBUG:-}" == "true" ]]; then
    enable_debug
fi

# endregion
# ==============================================================================
# region Variables
# ==============================================================================

logfile_enabled=0
date_log_format="%F %H:%M:%S"
script_run_time=$(date +"%FT%H:%M:%S")
safe_script_run_time=${script_run_time//:/_}
logfile="$safe_script_run_time".log
verbosity=3 # 0: quiet, 1: error, 2: warn, 3: normal, 4: verbose, 5: debug

# endregion
# ==============================================================================
# region Colors
# ==============================================================================

black='\033[0;30m'
red='\033[0;31m'
green='\033[0;32m'
yellow='\033[0;33m'
blue='\033[0;34m'
purple='\033[0;35m'
cyan='\033[0;36m'
white='\033[0;37m'

nc='\033[0m'

# endregion
# ==============================================================================
# region Functions
# ==============================================================================

logfile_header() {
    echo "Logfile: $logfile"
    echo "Timezone: $(date +"%Z") (UTC$(date +%z))"
    echo "Date format: $date_log_format"
    echo "Script run time: $script_run_time"
    echo "Script version: $VERSION"
    echo "Script name: $0"
    echo "Script PID: $$"
    echo "Script arguments:"
    echo "${orig_argv[@]}"
    echo "========================================================="
    echo
}

logfile_footer() {
    echo
    echo "========================================================="
    echo "Script exit time: $(date +"%F %H:%M:%S")"
    echo "Script exit code: $?"
}

log_base() {
    local color="$1"
    local severety="$2"
    local message="$3"
    local timestamp
    timestamp=$(date +"$date_log_format") || "NULL"
    local base_msg="[${timestamp}][${severety}]"
    if [[ "${logfile_enabled}" == "1" ]]; then
        echo "${base_msg} ${message}" >>"$logfile"
    fi
    echo -e "${color}${base_msg}${nc} ${message}"
}

error() {
    if [[ "${verbosity}" -ge "1" ]]; then
        log_base "${red}" "error" "$1"
    fi
}

warn() {
    if [[ "${verbosity}" -ge "2" ]]; then
        log_base "${yellow}" "warn" "$1"
    fi
}

log() {
    if [[ "${verbosity}" -ge "3" ]]; then
        log_base "${green}" "log" "$1"
    fi
}

verbose() {
    if [[ "${verbosity}" -ge "4" ]]; then
        log_base "${cyan}" "verbose" "$1"
    fi
}

debug() {
    if [[ "$debug_enabled" == "1" ]] || [[ "$verbosity" -ge "5" ]]; then
        log_base "${blue}" "debug" "$1"
    fi
}

print_help() {
    echo "Usage: $0 [options] [arguments]"
    echo "Options:"
    echo "  -h, --help              Print this help"
    echo "  -l, --logfile           Enable logging to logfile"
    echo "  -d, --debug             Enable debug mode"
    echo "  -v <n>, --verbose <n>   Enable verbose mode"
    echo "     n; 0: quiet, 1: error, 2: warn, 3: normal, 4: verbose, 5: debug"
    echo \
"  -q, --quiet             Disable all output (except errors; overrides verbose)"
    echo "  -V, --version           Print version"

    echo "Note: Multiple short option can NOT be used together. For example:"
    echo "'$0 -d -v' will work, but '$0 -dv' will not."
}

cleanup() {
    if [[ "${logfile_enabled}" == "1" ]]; then
        logfile_footer >>"$logfile"
        echo "Logfile: $logfile"
    fi
}

# endregion
# ==============================================================================
# region Argument parsing
# ==============================================================================

while [[ $# -gt 0 ]]; do
    case "$1" in
    -h | --help)
        print_help
        exit 0
        ;;
    -l | --logfile)
        logfile_enabled=1
        logfile_header "$0" "$@" >"$logfile"
        ;;
    -d | --debug)
        enable_debug
        ;;
    -v | --verbose)
        shift
        if [[ "$1" =~ ^[0-9]+$ ]]; then
            verbosity="$1"
        else
            error "Invalid verbosity level: $1"
            exit 1
        fi
        ;;
    -V | --version)
        echo "Version: $VERSION"
        exit 0
        ;;
    -q | --quiet)
        verbosity=1
        ;;
    *)
        echo "Unknown argument: $1"
        print_help
        exit 1
        ;;
    esac
    shift
done

# endregion
# ==============================================================================
# region Main
# ==============================================================================

main() {
    error "This is an error message"
    warn "This is a warning message"
    log "This is a log message"
    verbose "This is a verbose message"
    debug "This is a debug message"

    return 0
}

# endregion
# ==============================================================================

trap cleanup EXIT

if [[ "${BASH_SOURCE[0]}" == "$0" ]]; then
    main
fi
