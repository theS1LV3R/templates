#!/usr/bin/env python3
# =============================================================================
# Copyright: GPLv3 (c) 2022-present -- S1LV3R <s1lv3r.codes>
# Date: 2022-02-13
# =============================================================================

# =============================================================================
# region Imports
# =============================================================================
import argparse
import os
import sys
from datetime import datetime
from io import TextIOWrapper
from typing import Dict

import colorama

colorama.init()

# endregion
# =============================================================================
# region Variables
# =============================================================================

VERSION = '0.1.0'

verbosity_levels: Dict[str, int] = {
    'quiet': 0,
    'error': 1,
    'warning': 2,
    'info': 3,
    'verbose': 4,
    'debug': 5,
}

verbosity_color_map = [
    '',
    colorama.Fore.RED,
    colorama.Fore.YELLOW,
    colorama.Fore.GREEN,
    colorama.Fore.CYAN,
    colorama.Fore.BLUE,
]

verbosity = verbosity_levels['info']
log_format = "[%(time)s][%(levelname)s] %(message)s"
color_log_format = "%(color)s[%(time)s][%(levelname)s]%(reset)s %(message)s"
time_format = "%Y-%m-%d %H:%M:%S"
script_run_time = datetime.now().strftime(time_format)
log_file_name = script_run_time.replace(':', '_').replace(" ", "T") + '.log'
log_file_enabled = False
log_file: TextIOWrapper = None

log_file_header = """
Logfile: %(log_file_name)s
Timezone: %(timezone)s
Date format: %(time_format)s
Script run time: %(run_time)s
Script version: %(version)s
Script name: %(script_name)s
Script PID: %(script_pid)s
Script arguments:
%(script_args)s
============================================================

"""

log_file_footer = """
============================================================
Script exit time: %(exit_time)s
"""

# endregion
# =============================================================================
# region argparse
# =============================================================================
parser = argparse.ArgumentParser()

parser.add_argument("-V", "--version", action="version",
                    version="%(prog)s " + VERSION)
parser.add_argument("-q", "--quiet", help="quiet mode", action="store_true")
parser.add_argument("-d", "--debug", help="debug mode", action="store_true")
parser.add_argument("-v", "--verbosity", nargs="?", default=3, const=5, type=int,
                    help="set output verbosity, 0 being quietest")
parser.add_argument("-l", "--logfile",
                    help="enable logging to file", action="store_true")

parsed: argparse.Namespace = parser.parse_args()

verbosity = verbosity_levels['quiet'] if parsed.quiet else parsed.verbosity
log_file_enabled = parsed.logfile

if log_file_enabled:
    log_file = open(log_file_name, 'w')
    log_file.write(log_file_header % {
        'log_file_name': log_file_name,
        'timezone': datetime.now().tzname(),
        'time_format': time_format,
        'run_time': script_run_time,
        'version': VERSION,
        'script_name': __file__,
        'script_pid': str(os.getpid()),
        'script_args': ' '.join(sys.argv[1:]),
    })
    log_file.flush()

# endregion
# =============================================================================
# region Functions
# =============================================================================


def cleanup() -> None:
    if log_file_enabled:
        log_file.write(log_file_footer % {
            'exit_time': datetime.now().strftime(time_format),
        })


def get_key(dictionary: dict, value: str) -> str:
    for key, val in dictionary.items():
        if val == value:
            return key


def log(msg: str, level: int = 3) -> None:
    log_time = datetime.now().strftime(time_format)
    levelname = get_key(verbosity_levels, level)

    if level <= verbosity:
        print(color_log_format % {
            'color': verbosity_color_map[level],
            'time': log_time,
            'levelname': levelname,
            'message': msg,
            'reset': colorama.Style.RESET_ALL
        })

        if log_file_enabled:
            log_file.write(log_format % {
                'time': log_time,
                'levelname': levelname,
                'message': msg,
            })
            log_file.write('\n')
            log_file.flush()


def error(msg): return log(msg, level=verbosity_levels['error'])
def warn(msg): return log(msg, level=verbosity_levels['warning'])
def info(msg): return log(msg, level=verbosity_levels['info'])
def verbose(msg): return log(msg, level=verbosity_levels['verbose'])
def debug(msg): return log(msg, level=verbosity_levels['debug'])

# endregion
# =============================================================================
# region Main
# =============================================================================


def main() -> None:
    error("This is an error message")
    warn("This is a warning message")
    info("This is an info message")
    verbose("This is a verbose message")
    debug("This is a debug message")


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        raise e
    finally:
        cleanup()
